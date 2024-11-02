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
    public class Review
    {

        [Key]
        public int Review_ID { get; set; }

        public int? Rating { get; set; }

        public string? ReviewContent { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsEdited { get; set; } = false;

        public int? Produkti_ID { get; set; }   // Review - Produkti } shume - 1
        public int? User_Id { get; set; } // Review-User Shume - 1

        [ForeignKey(nameof(User_Id))]
        public virtual User? User { get; set; }

        [ForeignKey(nameof(Produkti_ID))]
        public virtual Produkti? Produkti { get; set; }
    }
}
