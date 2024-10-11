using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Produktet.Domain.Entities
{
    public class Wishlist
    {
        [Key]
        public int WishlistId { get; set; }

        public int? IdKlienti { get; set; }

        [ForeignKey("IdKlienti")]

        public virtual User? Klienti { get; set; }

        public virtual List<WishlistItem>? WishlistItem { get; set; }
    }
}
