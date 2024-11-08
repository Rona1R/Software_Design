using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.OrdersModule.DTOs
{
    public class UserOrderDTO
    {

        public int PorosiaID { get; set; } 

        public DateTime DataPorosise { get; set; }

        public decimal Totali {  get; set; }


        public string MetodaPageses { get; set; }

        public string Statusi { get; set; }

        public AdresaDerguese AdresaDerguese { get; set; }
    }
}
