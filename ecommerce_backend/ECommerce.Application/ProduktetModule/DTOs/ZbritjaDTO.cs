using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ZbritjaDTO
    {
        public int Zbritja_ID { get; set; }

        public string? ZbritjaEmri { get; set; }
        public int PerqindjaZbritjes { get; set; }
        public DateTime? DataSkadimit { get; set; }
    }
}
