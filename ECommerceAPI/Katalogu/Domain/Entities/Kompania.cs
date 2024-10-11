using System.ComponentModel.DataAnnotations;
using ECommerceAPI.Produktet.Domain.Entities;

namespace ECommerceAPI.Katalogu.Domain.Entities
{
    public class Kompania
    {

        [Key]
        public int Kompania_ID { get; set; }
        public String? Kompania_Emri { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual List<Produkti>? Produkti { get; set;}

    }

}
