using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class KompaniaKategoriaResponse
    {

        public int TotalCount { get; set; } 

        public KompaniaKategoriaMeProduktetDTO TeDhenat { get; set; }
    }
}
