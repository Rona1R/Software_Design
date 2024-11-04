using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class MeTeShituratDTO
    {
        public MeIShituriDTO Product { get; set; }

        public int? TotalQuantity { get; set; }
    }
}
