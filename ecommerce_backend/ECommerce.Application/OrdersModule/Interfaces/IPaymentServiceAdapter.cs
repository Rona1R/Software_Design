using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.OrdersModule.Interfaces
{
    public interface IPaymentServiceAdapter
    {
        Task<string> CreatePaymentIntentAsync(long amount, string currency);
    }
}
