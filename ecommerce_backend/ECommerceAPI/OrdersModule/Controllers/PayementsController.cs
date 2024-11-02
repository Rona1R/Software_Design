using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace ECommerceAPI.OrdersModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayementsController : ControllerBase
    {
        public PayementsController()
        {
            StripeConfiguration.ApiKey = "sk_test_51PjondEwCeRFjy4WD1JeGKWS4faWbFFpRhYSroLWAvSWimaSNHRx4tEZg4SouoTWnZajmFPIeaQMI9qXYH03dlNg00wxJmmLTb";
        }

        [HttpPost("payment_intents")]
        [Authorize] //?? provo
        public async Task<IActionResult> CreatePaymentIntent([FromBody] PaymentIntentCreateRequest request)
        {

            var options = new PaymentIntentCreateOptions
            {
                Amount = request.Amount,
                Currency = "eur",
            };

            var service = new PaymentIntentService();
            var paymentIntent = await service.CreateAsync(options);

            return Ok(paymentIntent.ClientSecret);
        }
    }

    public class PaymentIntentCreateRequest
    {
        public long Amount { get; set; } // Shuma ne cent

    }
}
