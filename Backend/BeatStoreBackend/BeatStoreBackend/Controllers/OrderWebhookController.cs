using AutoMapper;
using BeatStoreBackend.UtilityServices.MailSender;
using BeatStoreBackend.UtilityServices.MailSender.MailTemplates;
using Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace BeatStoreBackend.Controllers
{
    [Route("api/orderwebhook")]
    [ApiController]
    public class OrderWebhookController : Controller
    {
        private readonly IRepositoryManager repositoryManager;
        private readonly ILogger<OrderWebhookController> logger;
        private readonly IMailSender mailSender;
        private readonly IHostEnvironment env;

        public OrderWebhookController(IRepositoryManager repositoryManager, ILogger<OrderWebhookController> logger, IMailSender mailSender, IHostEnvironment env)
        {
            this.repositoryManager = repositoryManager;
            this.logger = logger;
            this.mailSender = mailSender;
            this.env = env;
        }

        string endpointSecret = Environment.GetEnvironmentVariable("SECRET_STRIPE_WEBHOOK");

        [HttpPost]
        public async Task<IActionResult> FulfillOrder()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], endpointSecret);

                // Handle the event
                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    var clientSecret = ((PaymentIntent)stripeEvent.Data.Object).ClientSecret;
                    var orderEntity = await repositoryManager.OrderRepository.GetOrderByIdAsync(clientSecret, trackChanges:true);

                    if (orderEntity == null)
                    {
                        string message = $"Order with id of {clientSecret} not found.";
                        logger.LogError(message);
                        return BadRequest(message);
                    }

                    foreach(var orderItem in orderEntity.OrderItems)
                    {
                        if (orderItem.LicenseType.Equals("exclusive"))
                        {
                            var audioEntity = await repositoryManager.AudioItemRepository
                                .GetAudioItemByIdAsync(orderItem.AudioItemId, trackChanges:true);

                            audioEntity.IsBought = true;
                        }
                    }

                    orderEntity.IsFulfilled = true;

                    var basePath = Path.Combine(env.ContentRootPath, "LocalFiles", "Licenses");

                    var filesToSend = new List<string>() { Path.Combine(basePath, "lease_TOS.pdf"), 
                        Path.Combine(basePath, "exclusive_TOS.pdf") };

                    var mailData = FulfilledOrderTemplate.CreateFromTemplate(filesToSend, orderEntity);

                    await mailSender.SendEmailAsync(mailData);

                    await repositoryManager.SaveAsync();
                }

                else if (stripeEvent.Type == Events.PaymentIntentPaymentFailed)
                
                {
                    var clientSecret = ((PaymentIntent)stripeEvent.Data.Object).ClientSecret;
                    var orderEntity = await repositoryManager.OrderRepository.GetOrderByIdAsync(clientSecret, trackChanges: false);

                    if (orderEntity == null)
                    {
                        string message = $"Order with id of {clientSecret} not found.";
                        logger.LogError(message);
                        return BadRequest(message);
                    }

                    repositoryManager.OrderRepository.DeleteOrder(orderEntity);
                    logger.LogInformation("Payment failed!");

                    await repositoryManager.SaveAsync();
                }
                // ... handle other event types
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }
    }
}
