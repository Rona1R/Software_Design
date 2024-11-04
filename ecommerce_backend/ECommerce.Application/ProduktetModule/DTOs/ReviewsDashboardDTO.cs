using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ReviewsDashboardDTO
    {
        public int ReviewID { get; set; }

        public int? KlientiID { get; set; }

        public string? KlientiUsername { get; set; }

        public string? KlientiEmail { get; set; }

        public int? ProduktiID { get; set; }

        public string? ProduktiEmri { get; set; }

        public string? Komenti { get; set; }

        public int? Rating { get; set; }
    }
}
