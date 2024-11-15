using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class ProduktetSipasKategoriseResponse
    {

        public int TotalCount { get; set; }

        public KategoriaMeProduktetDTO TeDhenat { get; set; }
    }
}
