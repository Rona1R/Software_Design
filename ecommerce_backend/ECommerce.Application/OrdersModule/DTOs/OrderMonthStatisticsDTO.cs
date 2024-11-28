using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.OrdersModule.DTOs
{
    public class OrderMonthStatisticsDTO
    {
        public int NumriProdukteve { get; set; }
        public string Month { get; set; }
        public int MonthNumber { get; set; }
    }
}
