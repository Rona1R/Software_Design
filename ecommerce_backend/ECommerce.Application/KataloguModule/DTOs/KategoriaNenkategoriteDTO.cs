using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;


namespace ECommerce.Application.KataloguModule.DTOs
{
    public class KategoriaNenkategoriteDTO
    {

        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public List<SubCategoryDTO> SubCategory { get; set; }
    }
}
