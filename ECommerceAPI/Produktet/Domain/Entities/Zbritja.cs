using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Produktet.Domain.Entities
{
    public class Zbritja
    {
        [Key]
        public int Zbritja_ID { get; set; }

        public string? ZbritjaEmri { get; set; }

        public int PerqindjaZbritjes { get; set; }

        public DateTime? DataKrijimit { get; set; } = DateTime.Now;

        public DateTime? DataSkadimit { get; set; }


        public virtual List<Produkti>? Produkti { get; set; }
    }
}
