using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class KategoriaSidebarData
    {
        public List<CompanyName> CompanyNames { get; set; }  
        public decimal? MaxPrice { get; set; }
    }

    public class CompanyName
    {
        public string Name { get; set; }
    }
}
