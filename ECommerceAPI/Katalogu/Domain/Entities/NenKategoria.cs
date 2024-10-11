using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Permissions;
using ECommerceAPI.Produktet.Domain.Entities;

namespace ECommerceAPI.Katalogu.Domain.Entities
{
    public class NenKategoria
    {
        [Key]
        public int NenKategoria_ID{ get; set; }

        public string? EmriNenkategorise { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //  Nenkategoria (m) --- Kategoria (1)

        public int Kategoria_ID { get; set; }

        [ForeignKey(nameof(Kategoria_ID))]  
        public virtual Kategoria? Kategoria { get; set; }

        public virtual List<Produkti>? Produkti { get; set;}


    }
}
