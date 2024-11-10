namespace ECommerce.Application.ProduktetModule.ViewModels
{
    public class ProductWishlistVM
    {
        public int Produkti_ID { get; set; }

        public int? WishlistItemId { get; set; }
        public String? EmriProdukti { get; set; }

        public String? FotoProduktit { get; set; } = "placeholder-image.jpg";

        public String? PershkrimiProduktit { get; set; }


        public bool? NeShitje {  get; set; }

        public decimal? CmimiPerCope { get; set; }
    }

}
