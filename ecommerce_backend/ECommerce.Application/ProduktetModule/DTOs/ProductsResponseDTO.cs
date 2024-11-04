using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ProductsResponseDTO
    {
        public int TotalCount { get; set; }
        public List<ProduktetKompaniseDTO> PagedProducts { get; set; }
    }
}
