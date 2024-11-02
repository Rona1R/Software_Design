using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Domain.UsersModule.Entities
{
    public class Adresa
    {
        [Key]
        public int Adresa_Id { get; set; }


        public string AdresaUserit { get; set; }
        public string Shteti { get; set; }

        public string Qyteti { get; set; }

        public string ZipKodi { get; set; }

        public Boolean IsDefault { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

    }
}
