using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ZbritjaResponsesDTO
    {
        public int Zbritja_ID { get; set; }

        public String? ZbritjaEmri { get; set; }

        public int PerqindjaZbritjes { get; set; }

        public DateTime? DataKrijimit { get; set; } = DateTime.Now;

        public DateTime? DataSkadimit { get; set; }
    }
}
