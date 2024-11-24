using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ProduktZbritjaDTO
    {
        public int ProduktiID { get; set; }

        public int? ZbritjaID { get; set; }

        public decimal? CmimiParaZbritjes { get; set; }

        public string? ProduktiEmri { get; set; }
        public decimal? CmimiMeZbritje { get; set; }
    }
}
