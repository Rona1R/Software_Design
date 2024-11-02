using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.UsersModule.Entities;

namespace ECommerce.Domain.ProduktetModule.Entities
{
    public class AchievementBadge
    {
        [Key]
        public int Badge_Id { get; set; }

        public string? Badge_Name { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual List<User>? Users { get; set; }
    }
}
