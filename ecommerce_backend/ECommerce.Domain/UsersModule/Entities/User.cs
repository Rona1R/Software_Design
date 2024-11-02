using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ECommerce.Domain.OrdersModule.Entities;
using ECommerce.Domain.ProduktetModule.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Domain.UsersModule.Entities
{
    public class User
    {
        [Key]
        public int User_Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int? Badge_Id { get; set; }

        public String ProfilePic { get; set; } = "defaultProfilePic.png";

        public String? RefreshToken { get; set; }

        public string AspNetUserId { get; set; }

        [ForeignKey(nameof(AspNetUserId))]
        public virtual IdentityUser AspNetUser { get; set; }

        // User - Review 1- shume
        public virtual List<Review>? Review { get; set; }

        [ForeignKey(nameof(Badge_Id))]
        public virtual AchievementBadge? AchievementBadge { get; set; }

        public virtual List<Wishlist>? Wishlist { get; set; }

        public virtual List<Porosia>? Porosia { get; set; }

        public virtual List<Adresa>? Adresa { get; set; }
    }
}
