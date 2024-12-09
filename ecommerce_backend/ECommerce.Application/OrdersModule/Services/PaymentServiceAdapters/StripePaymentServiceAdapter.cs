using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.OrdersModule.Interfaces;
using Stripe;

namespace ECommerce.Application.OrdersModule.Services.PaymentServiceAdapters
{
    public class StripePaymentServiceAdapter : IPaymentServiceAdapter
    {
        public StripePaymentServiceAdapter()
        {
            StripeConfiguration.ApiKey = "sk_test_51PjondEwCeRFjy4WD1JeGKWS4faWbFFpRhYSroLWAvSWimaSNHRx4tEZg4SouoTWnZajmFPIeaQMI9qXYH03dlNg00wxJmmLTb";
        }

        public async Task<string> CreatePaymentIntentAsync(long amount, string currency)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = currency,
                PaymentMethodTypes = new List<string> { "card" }
            };

            var service = new PaymentIntentService();
            var paymentIntent = await service.CreateAsync(options);
            return paymentIntent.ClientSecret;
        }
    }

}
