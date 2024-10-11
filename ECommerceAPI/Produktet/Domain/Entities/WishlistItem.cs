using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Produktet.Domain.Entities
{
    public class WishlistItem
    {
        [Key]
        public int WishlistItemId { get; set; }
        public int? WishlistId { get; set; }

        public int Produkti_ID { get; set; }

        [ForeignKey(nameof(WishlistId))]
        public virtual Wishlist? Wishlist { get; set; }

        [ForeignKey(nameof(Produkti_ID))]
        public virtual Produkti? Produkti { get; set; }

    }
}
