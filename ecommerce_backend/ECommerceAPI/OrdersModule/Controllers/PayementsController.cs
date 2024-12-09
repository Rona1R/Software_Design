using ECommerce.Application.OrdersModule.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.OrdersModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayementsController : ControllerBase
    {
        private readonly IPaymentServiceAdapter _paymentService;

        public PayementsController(IPaymentServiceAdapter paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("payment_intents")]
        [Authorize]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] PaymentIntentCreateRequest request)
        {
            var clientSecret = await _paymentService.CreatePaymentIntentAsync(request.Amount, "eur");
            return Ok(clientSecret);
        }
    }

    public class PaymentIntentCreateRequest
    {
        public long Amount { get; set; } // Shuma ne cent

    }
}
