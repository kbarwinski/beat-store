using AutoMapper;
using BeatStoreBackend.UtilityServices;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
namespace BeatStoreBackend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IRepositoryManager repositoryManager;
        private readonly ILogger<OrderController> logger;
        private readonly IMapper mapper;

        public OrderController(IRepositoryManager repositoryManager, ILogger<OrderController> logger, IMapper mapper)
        {
            this.repositoryManager = repositoryManager;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderIntent(OrderInputDto orderInputDto)
        {
            if(orderInputDto == null)
            {
                string message = "Order input dto is null.";
                logger.LogError(message);
                return BadRequest(message);
            }

            var orderEntity = mapper.Map<Order>(orderInputDto);

            decimal totals = 0;
            foreach(var orderItem in orderEntity.OrderItems)
            {
                var audioItemEntity = await repositoryManager.AudioItemRepository.GetAudioItemByIdAsync(orderItem.AudioItemId, trackChanges:true);
                if(audioItemEntity == null)
                {
                    string message = $"Audio item with id of {orderItem.Id} not found.";
                    logger.LogError(message);
                    return BadRequest(message);
                }
                var license = orderItem.LicenseType;
                if (license.Equals("exclusive"))
                {
                    totals += audioItemEntity.ExclusivePrice;
                    audioItemEntity.IsBought = true;
                }
                else
                    totals += audioItemEntity.LeasePrice;
            }
            orderEntity.Totals = totals;

            StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("SECRET_STRIPE_API");

            var intentOptions = new PaymentIntentCreateOptions
            {
                Amount = (long)(totals * 100),
                Currency = "usd", 
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
                
            };

            var intentService = new PaymentIntentService();
            var intent = await intentService.CreateAsync(intentOptions);
            orderEntity.Id = intent.ClientSecret;

            repositoryManager.OrderRepository.CreateOrder(orderEntity);
            await repositoryManager.SaveAsync();

            return Ok(new{
                clientSecret = intent.ClientSecret, 
                orderId= orderEntity.Id 
            });
        }

        [HttpGet("{orderId}/audioitems")]
        public async Task<IActionResult> GetAudioItemsByOrderId(string orderId)
        {
            var orderEntity = await repositoryManager.OrderRepository.GetOrderByIdAsync(orderId, trackChanges:false);
            if(orderEntity == null)
            {
                string message = $"Order with the id of {orderId} not found.";
                logger.LogError(message);
                return BadRequest(message);
            }
            if (!orderEntity.IsFulfilled)
            {
                string message = $"Order with the id of {orderId} not fulfilled.";
                logger.LogWarning(message);
                return BadRequest(message);
            }
            List<AudioItem> audioEntities = new List<AudioItem>();
            foreach(var orderItem in orderEntity.OrderItems)
            {
                var audioEntity = await repositoryManager.AudioItemRepository.GetAudioItemByIdAsync(orderItem.AudioItemId, trackChanges:false);
                if(audioEntity!=null)
                    audioEntities.Add(audioEntity);
            }

            return Ok(audioEntities);
        }

    }
}
