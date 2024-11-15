using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class FiltersDTO
    {
        public string[] SelectedCompanies { get; set; }

        public decimal[] PriceRange { get; set; }

        public string SearchTerm { get; set; }
    }
}
