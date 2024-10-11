using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceAPI.Produktet.Domain.Entities
{
    public class Atributi
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DataType { get; set; }

        public virtual List<ProduktiAtributi> ProduktiAtributi { get; set; } = new List<ProduktiAtributi>();
        public virtual List<AtributiOption> AtributiOption { get; set; } = new List<AtributiOption>();
    }
}
