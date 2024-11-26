using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class KompaniaSidebarData
    {
        public List<KategoriaNenkategoriteDTO> Categories { get; set; } 

        public decimal? MaxPrice { get; set; }

    }
}
