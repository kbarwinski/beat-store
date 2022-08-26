using AutoMapper;
using BeatStoreBackend.UtilityServices;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Entities.RequestParameters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BeatStoreBackend.Controllers
{
    [Route("api/audioitems")]
    [ApiController]
    public class AudioItemController : ControllerBase
    {
        private readonly IRepositoryManager repositoryManager;
        private readonly ILogger<AppUserController> logger;
        private readonly IMapper mapper;
        private readonly IJwtClaimReader jwtClaimReader;

        public AudioItemController(IRepositoryManager repositoryManager, ILogger<AppUserController> logger, IMapper mapper, 
            IWebHostEnvironment webHostEnvironment, IJwtClaimReader jwtClaimReader)
        {
            this.repositoryManager = repositoryManager;
            this.logger = logger;
            this.mapper = mapper;
            this.jwtClaimReader = jwtClaimReader;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAudioItems([FromQuery] AudioItemParameters audioItemParameters)
        {
            if(!audioItemParameters.ValidPriceRange || !audioItemParameters.ValidBpmRange)
            {
                string message = "At least one of the filtering ranges is not valid.";
                logger.LogError(message);
                return BadRequest(message);
            }

            var audioItems = await repositoryManager.AudioItemRepository.GetAllAudioItemsAsync(audioItemParameters, false);

            var audioItemsDto = mapper.Map<IEnumerable<AudioItemDto>>(audioItems);

            return Ok(audioItemsDto);
        }

        [HttpGet("{audioItemId}", Name="GetAudioItemById")]
        public async Task<IActionResult> GetAudioItemById(Guid audioItemId)
        {
            var audioItem = await repositoryManager.AudioItemRepository.GetAudioItemByIdAsync(audioItemId, trackChanges: false);

            if(audioItem == null)
            {
                string message = $"Item with the ID of {audioItemId} not found.";
                logger.LogInformation(message);
                return NotFound();
            }

            var audioItemDto = mapper.Map<AudioItemDto>(audioItem);

            return Ok(audioItemDto);
        }

        [HttpGet("{audioItemId}/audiourl")]
        public async Task<IActionResult> GetAudioUrlByAudioItemId(Guid audioItemId)
        {
            var audioItem = await repositoryManager.AudioItemRepository.GetAudioItemByIdAsync(audioItemId, trackChanges: false);

            if (audioItem == null)
            {
                string message = $"Item with the ID of {audioItemId} not found.";
                logger.LogInformation(message);
                return NotFound();
            }

            var audioUrl = audioItem.AudioUrl;

            return Ok(audioUrl);
        }

        [HttpGet("minmaxbpm")]
        public async Task<IActionResult> GetAudioItemsMinMaxBpm()
        {
            var minMaxBpm = await repositoryManager.AudioItemRepository.GetMinMaxAudioItemsBpm(trackChanges: false);
            return Ok(new MinMaxDto<int> { Min = minMaxBpm.First(), Max = minMaxBpm.Last()});
        }

        [HttpGet("minmaxprice")]
        public async Task<IActionResult> GetAudioItemsMinMaxPrice()
        {
            var minMaxPrice = await repositoryManager.AudioItemRepository.GetMinMaxPrices(trackChanges: false);
            return Ok(new MinMaxDto<decimal> { Min = minMaxPrice.First(), Max = minMaxPrice.Last()});
        }

        [HttpPost("/api/audioitems"), Authorize]
        public async Task<IActionResult> CreateAudioItem
            ( 
            [FromForm]AudioItemInputDto audioItem, 
            [FromServices]IFileToUrlConverter fileToUrl
            )
        {

            if(audioItem == null)
            {
                string message = "AudioItemInputDto is null.";
                logger.LogError(message);
                return BadRequest(message);
            }

            string appUserId = jwtClaimReader.ReadClaimFromHeader(ClaimTypes.Name);
            var appUser = await repositoryManager.AppUserRepository.GetAppUserAsync(appUserId, false);
            if(appUser == null)
            {
                string message = $"User with the ID of {appUserId} not found.";
                logger.LogInformation(message);
                return NotFound();
            }

            if (string.IsNullOrEmpty(audioItem.AudioUrl))
            {
                var audioFilename = Guid.NewGuid().ToString();
                var savedFilepath = await fileToUrl.SaveFileAsStaticResource(file:audioItem.Audio, folderName:"audio", destFilename:audioFilename);

                audioItem.AudioUrl = savedFilepath;
            }
            if(string.IsNullOrEmpty(audioItem.ImageUrl))
            {
                var imageFilename = Guid.NewGuid().ToString();
                var savedFilepath = await fileToUrl.SaveFileAsStaticResource(file:audioItem.Image, folderName:"image", destFilename:imageFilename);

                audioItem.ImageUrl = savedFilepath;
            }

            var audioItemEntity = mapper.Map<AudioItem>(audioItem);

            repositoryManager.AudioItemRepository.CreateAudioItemForAppUser(appUserId, audioItemEntity);
            await repositoryManager.SaveAsync();

            var audioItemToReturn = mapper.Map<AudioItemDto>(audioItemEntity);

            return CreatedAtRoute("GetAudioItemById", new { audioItemId = audioItemEntity.Id }, audioItemToReturn);
        }

        [HttpDelete("/api/audioitems/{audioItemId}"), Authorize]
        public async Task<IActionResult> DeleteAudioItem(Guid audioItemId)
        {
            string appUserId = jwtClaimReader.ReadClaimFromHeader(ClaimTypes.Name);
            var appUser = await repositoryManager.AppUserRepository.GetAppUserAsync(appUserId, trackChanges:false);
            if(appUser == null)
            {
                string message = $"User with the ID of {appUserId} not found.";
                logger.LogInformation(message);
                return NotFound();
            }

            var audioItemEntity = await repositoryManager.AudioItemRepository.GetAudioItemByIdAsync(audioItemId, trackChanges:false);
            if(audioItemEntity == null)
            {
                string message = $"Item with the ID of {audioItemId} not found.";
                logger.LogInformation(message);
                return NotFound();
            }
            if(!audioItemEntity.UserId.Equals(appUserId))
            {
                string message = $"Item with the ID of {audioItemId} belongs to the other app user.";
                logger.LogInformation(message);
                return NotFound();
            }

            repositoryManager.AudioItemRepository.DeleteAudioItem(audioItemEntity);
            await repositoryManager.SaveAsync();

            return NoContent();
        }

        [HttpPut("/api/audioitems/{audioItemId}"), Authorize]
        public async Task<IActionResult> UpdateAudioItem(Guid audioItemId, [FromBody] AudioItemUpdateDto audioItem)
        {
            if(audioItem == null)
            {
                string message = "AudioItemUpdateDto sent from client is null.";
                logger.LogError(message);
                return BadRequest(message);
            }

            string appUserId = jwtClaimReader.ReadClaimFromHeader(ClaimTypes.Name);
            var appUser = await repositoryManager.AppUserRepository.GetAppUserAsync(appUserId, trackChanges:false);
            if (appUser == null)
            {
                string message = $"User with the ID of {appUserId} not found.";
                logger.LogInformation(message);
                return NotFound();
            }

            var audioItemEntity = await repositoryManager.AudioItemRepository.GetAudioItemByIdAsync(audioItemId, trackChanges:true);
            if (audioItemEntity == null)
            {
                string message = $"Item with the ID of {audioItemId} not found.";
                logger.LogInformation(message);
                return NotFound();
            }
            if (!audioItemEntity.UserId.Equals(appUserId))
            {
                string message = $"Item with the ID of {audioItemId} belongs to the other app user.";
                logger.LogInformation(message);
                return NotFound();
            }

            mapper.Map(audioItem, audioItemEntity);
            await repositoryManager.SaveAsync();

            return NoContent();
        }
    }
}