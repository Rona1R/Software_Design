namespace ECommerce.Application.KataloguModule.DTOs
{
    public class ProduktetKompaniseKategoriseDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Img { get; set; }

        public decimal? Cost { get; set; }

        public decimal? CmimiMeZbritje { get; set; }

        public string? Subcategory { get; set; }

        public int? SubcategoryId { get; set; }

        public int? Stock { get; set; }

        public int? Rating { get; set; }
    }

    public class KompaniaKategoriaMeProduktetDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? CategoryId { get; set; }

        public string? CategoryName { get; set; }

        public List<ProduktetKompaniseKategoriseDTO>? Products { get; set; }
    }
}
