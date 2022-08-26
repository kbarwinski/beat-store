using AutoMapper;
using BeatStoreBackend.UtilityServices;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BeatStoreBackend.Controllers
{
    [Route("api/appusers")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private readonly IRepositoryManager repositoryManager;
        private readonly ILogger<AppUserController> logger;
        private readonly IMapper mapper;
        private readonly UserManager<AppUser> userManager;
        private readonly IAuthenticationManager authenticationManager;

        public AppUserController(IRepositoryManager repositoryManager, ILogger<AppUserController> logger, IMapper mapper, 
            UserManager<AppUser> userManager, IAuthenticationManager authenticationManager)
        {
            this.repositoryManager = repositoryManager;
            this.logger = logger;
            this.mapper = mapper;
            this.userManager = userManager;
            this.authenticationManager = authenticationManager;
        }

        [HttpGet("invite"), Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetInvitationToken([FromServices] IJwtClaimReader jwtClaimReader)
        {
            string appUserId = jwtClaimReader.ReadClaimFromHeader(ClaimTypes.Name);

            var appUserEntity = await repositoryManager.AppUserRepository.GetAppUserAsync(appUserId, false);
            if (appUserEntity == null)
            {
                string message = "User with specified ID not found.";
                logger.LogError(message);
                return BadRequest(message);
            }

            var invitationToken = await userManager.GenerateUserTokenAsync(appUserEntity, TokenOptions.DefaultProvider, "invitation");
            return Ok(invitationToken);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAppUsers()
        {
            var appUserEntity = await repositoryManager.AppUserRepository.GetAllAppUsersAsync(trackChanges: false);

            var appUserDto = mapper.Map<IEnumerable<AppUserDto>>(appUserEntity);

            return Ok(appUserDto);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] AppUserRegisterDto appUser)
        {
            var referrerEntity = await repositoryManager.AppUserRepository.GetAppUserByUserNameAsync(appUser.Referrer, false);
            if(referrerEntity == null)
            {
                string message = "Referrer not valid.";
                logger.LogError(message);
                return BadRequest(message);
            }

            var isInvitationValid = await userManager.VerifyUserTokenAsync(referrerEntity, TokenOptions.DefaultProvider, "invitation", appUser.InvitationCode);
            if (!isInvitationValid)
            {
                string message = "Invitation code not valid.";
                logger.LogError(message);
                return BadRequest(message);
            }

            var codeUserEntity = await repositoryManager.AppUserRepository.GetAppUserByInvitationCode(appUser.InvitationCode, false);
            if (codeUserEntity != null)
            {
                string message = "Invitation code already taken.";
                logger.LogError(message);
                return BadRequest(message);
            }

            var appUserEntity = mapper.Map<AppUser>(appUser);

            var result = await userManager.CreateAsync(appUserEntity, appUser.Password);
            if(!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            await userManager.AddToRolesAsync(appUserEntity, new string [] {"Author"});

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] AppUserAuthInputDto appUser)
        {
            if (!await authenticationManager.ValidateUser(appUser))
            {
                string message = "Authentication failed due to the wrong credentials.";
                logger.LogWarning(message);
                return Unauthorized(message);
            }

            var appUserEntity = await repositoryManager.AppUserRepository.GetAppUserByUserNameAsync(appUser.UserName, trackChanges: false);
            var userClaims = await userManager.GetRolesAsync(appUserEntity);

            var userToken = await authenticationManager.CreateJwtToken();

            return Ok(new AppUserAuthDto { Token= userToken, Roles= userClaims.ToList() });
        }
    }
}
