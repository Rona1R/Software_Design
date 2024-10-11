using System.ComponentModel.DataAnnotations;
using ECommerceAPI.Produktet.Domain.Entities;

namespace ECommerceAPI.Katalogu.Domain.Entities
{
    public class Kategoria
    {
        [Key]
        public int Kategoria_ID { get; set; }

        public String? EmriKategorise { get; set; }
        public String? Pershkrimi { get; set; }

        // Navigation Property: (Kategoria[1] <---- Produkti[Shume])

        public virtual List<Produkti>? Produkti { get; set; }

        // Kategoria (1)----- Nenkategoria (m)
        public virtual List<NenKategoria>? NenKategoria { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
