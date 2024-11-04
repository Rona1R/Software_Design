using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class SidebarDataNeZbritje
    {
        public List<CategoryDTO> Categories { get; set; }   

        public decimal? MaxPrice { get; set; }  
    }
}
