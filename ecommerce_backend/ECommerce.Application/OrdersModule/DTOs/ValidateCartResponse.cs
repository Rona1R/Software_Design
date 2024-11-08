using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.OrdersModule.DTOs
{
    public class ValidateCartResponse
    {
        public bool IsValid { get; set; }

        public List<string>? Errors { get; set; }   
    }
}
