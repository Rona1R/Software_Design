using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class CartProductDTO
    {
        public int Id { get; set; } 

        public string Name { get; set; }    

        public decimal CmimiBaze { get; set; } 

        public string Image { get; set; }
    }
}
