namespace ECommerceAPI.DTOs
{
    public class ProduktetKompaniseDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Img { get; set; }

        public decimal? Cost { get; set; }

        // ktu ka mu perfshi edhe CmimiMeZbritje kur te funksionalizohet qikjo

        public decimal? CmimiMeZbritje { get; set; }

        public string? Category { get; set; }

        public int? CategoryId { get; set; }

        public string? Subcategory { get; set; }    

        public int? SubcategoryId { get; set; } 

        public int? Stock { get; set; }

        public int? Rating { get; set; }
    }

    public class KompaniaMeProduktetDTO
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public List<ProduktetKompaniseDTO>? Products { get; set; }
    }
}
