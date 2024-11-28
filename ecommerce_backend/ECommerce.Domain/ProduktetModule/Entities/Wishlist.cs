using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.UsersModule.Entities;

namespace ECommerce.Domain.ProduktetModule.Entities
{
    public class Wishlist
    {
          
        [Key]
        public int WishlistId { get; set; }

        public int IdKlienti { get; set; }

        [ForeignKey("IdKlienti")]

        public virtual User Klienti { get; set; }

        public virtual List<WishlistItem> WishlistItem { get; set; } = new List<WishlistItem>();    
    }
}
