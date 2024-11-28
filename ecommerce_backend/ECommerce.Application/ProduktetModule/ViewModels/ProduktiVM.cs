namespace ECommerce.Application.ProduktetModule.ViewModels
{
    public class ProduktiVM
    { 
        public String Emri { get; set; }

        public String Foto { get; set; } = "placeholder-image.jpg";

        public String Pershkrimi { get; set; }

        public int Stoku { get; set; }

        public decimal Cmimi { get; set; }

        // Produkti ----> Kompania (shume-1) 1 kompani mundet me permbajt shume produkte dhe secili produkt i nje kompani specifik
        public int Kompania_ID { get; set; }

        public int Kategoria_ID { get; set; }

        public int NenKategoria_ID { get; set; }

        public bool NeShitje { get; set; }
    }
}
