using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Users.Domain.Entities
{
    public class AchievementBadge
    {
        [Key]
        public int Badge_Id { get; set; } 

        public string? Badge_Name { get; set; }

        public DateTime CreatedAt { get; set; }  = DateTime.UtcNow; 

        public virtual List<User>? Users { get; set; }   
    }
}
