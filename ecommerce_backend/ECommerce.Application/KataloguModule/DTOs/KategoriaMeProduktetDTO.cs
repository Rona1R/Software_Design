using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class ProduktetKategoriseDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Img { get; set; }

        public decimal? Cost { get; set; }

        public decimal? CmimiMeZbritje { get; set; }

        public string? Company { get; set; }

        public int? CompanyId { get; set; }

        public string? Subcategory { get; set; }

        public int? SubcategoryId { get; set; }

        public int? Stock { get; set; }

        public int? Rating { get; set; }
    }

    public class KategoriaMeProduktetDTO
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public List<ProduktetKategoriseDTO>? Products { get; set; }
    }
}
