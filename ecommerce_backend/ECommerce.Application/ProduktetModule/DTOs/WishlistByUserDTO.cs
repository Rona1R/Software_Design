using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class WishlistByUserDTO
    {
        public List<ProductWishlistVM> Produkti { get; set; }
    }
}
