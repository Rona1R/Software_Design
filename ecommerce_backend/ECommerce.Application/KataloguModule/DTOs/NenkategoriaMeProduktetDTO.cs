using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class ProduktetNenkategoriseDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Img { get; set; }

        public decimal? Cost { get; set; }

        // ktu ka mu perfshi edhe CmimiMeZbritje kur te funksionalizohet qikjo

        public decimal? CmimiMeZbritje { get; set; }
        
        public string? Company { get; set; }

        public int? CompanyId { get; set; }

        public int? Stock { get; set; }

        public int? Rating { get; set; }
    }

    public class NenkategoriaMeProduktetDTO
    {
        public int? SubcategoryId { get; set; }

        public string? SubCategoryName { get; set; }

        public string? Category { get; set; }

        public List<ProduktetNenkategoriseDTO>? Products { get; set; }
    }
}
