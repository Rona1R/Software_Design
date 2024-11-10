using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class WishlistItemResponse
    {
        public bool Exists { get; set; }    

        public WishlistItemDTO? NdodhetNeWishliste { get; set; } 
    }
}
