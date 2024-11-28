using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class KompaniaKategoriaSidebarData
    {

        public decimal? MaxPrice { get; set; }   

        public List<SubCategoryDTO> Subcategories { get; set; }
    }
}
