using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ECommerceAPI.Katalogu.Domain.Entities;
using ECommerceAPI.Order.Domain.Entities;

namespace ECommerceAPI.Produktet.Domain.Entities
{
    public class Produkti
    {

        [Key]
        public int Produkti_ID { get; set; }

        public string? EmriProdukti { get; set; }

        public string? FotoProduktit { get; set; } = "placeholder-image.jpg";

        public string? PershkrimiProduktit { get; set; }

        public int? SasiaNeStok { get; set; }

        public decimal? CmimiPerCope { get; set; }

        // Produkti ----> Kompania (shume-1) 1 kompani mundet me permbajt shume produkte dhe secili produkt i nje kompani specifik
        public int? Kompania_ID { get; set; }

        public int? Kategoria_ID { get; set; }

        public int? NenKategoria_ID { get; set; }

        public DateTime DataVendsojesNeZbritje { get; set; }

        public int? Zbritja_ID { get; set; }

        public bool? NeShitje { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(Kompania_ID))]
        public virtual Kompania? Kompania { get; set; }

        // Produkti (shume) ------->- Kategoria (1)

        [ForeignKey(nameof(Kategoria_ID))]
        public virtual Kategoria? Kategoria { get; set; }

        [ForeignKey(nameof(NenKategoria_ID))]
        public virtual NenKategoria? NenKategoria { get; set; }


        [ForeignKey(nameof(Zbritja_ID))]
        public virtual Zbritja? Zbritja { get; set; }

        public virtual List<Review>? Review { get; set; }

        public virtual List<WishlistItem>? WishlistItem { get; set; }

        public virtual List<PorosiaItem>? PorosiaItem { get; set; }

        public virtual List<ProduktiAtributi> ProduktiAtributi { get; set; } = new List<ProduktiAtributi>();

    }
}
