using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ReviewsDTO
    {
        public int Id { get; set; }
        public int? UserId { get; set; }

        public string? Username { get; set; }

        public string? Text { get; set; }

        public int? Rating { get; set; }

        public string? AchievementBadge { get; set; }

        public DateTime? DateAdded { get; set; }

        public bool? IsEdited { get; set; }
    }
}
