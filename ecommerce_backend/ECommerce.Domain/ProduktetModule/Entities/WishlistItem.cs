using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Domain.ProduktetModule.Entities
{
    public class WishlistItem
    {
        [Key]
        public int WishlistItemId { get; set; }
        public int WishlistId { get; set; }

        public int Produkti_ID { get; set; }

        [ForeignKey(nameof(WishlistId))]
        public virtual Wishlist Wishlist { get; set; }

        [ForeignKey(nameof(Produkti_ID))]
        public virtual Produkti Produkti { get; set; }

    }
}
