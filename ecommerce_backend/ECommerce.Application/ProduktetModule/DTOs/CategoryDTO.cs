using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class CategoryDTO
    {
  
            public int CategoryId { get; set; }

            public string CategoryName { get; set; }

            public List<SubCategoryDTO> SubCategory { get; set; }
    }
}
