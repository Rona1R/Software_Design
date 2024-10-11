using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceAPI.Produktet.Domain.Entities
{
    public class AtributiOption
    {
        public int Id { get; set; }

        public string OptionValue { get; set; }

        public int AtributiId { get; set; }

        [ForeignKey(nameof(AtributiId))]
        public virtual Atributi Atributi { get; set; }
    }
}
