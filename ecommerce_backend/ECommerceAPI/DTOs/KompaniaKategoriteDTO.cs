namespace ECommerceAPI.DTOs
{
    public class CompanyCategoryDTO
    {
        public int? CategoryId { get; set; }

        public string? CategoryName { get; set; }

    }
    public class  CompanyDTO
    {
        public int Id { get; set; } 

        public string Name { get; set;}

        public List<CompanyCategoryDTO> CompanyCategories { get; set; }
    }
}
