using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class SidebarDataNeZbritje
    {
        public List<KategoriaNenkategoriteDTO> Categories { get; set; }   

        public decimal? MaxPrice { get; set; }  
    }
}
