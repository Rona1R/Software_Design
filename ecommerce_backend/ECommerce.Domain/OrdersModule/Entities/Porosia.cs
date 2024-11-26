using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ECommerce.Domain.UsersModule.Entities;

namespace ECommerce.Domain.OrdersModule.Entities
{
    public class Porosia
    {
        [Key]
        public int Porosia_ID { get; set; }

        public string Statusi_Porosise { get; set; } = "Nen Procesim";

        public string MetodaPageses { get; set; }

        public int TotaliProdukteve { get; set; }

        public decimal CmimiTotal { get; set; }

        public string Adresa { get; set; }


        public string Shteti { get; set; }


        public string Qyteti { get; set; }

        public string NrKontaktues { get; set; }
        public string ZipKodi { get; set; }

        public DateTime DataPorosise { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        public virtual List<PorosiaItem> PorosiaItem { get; set; } = new List<PorosiaItem>();   
    }
}
