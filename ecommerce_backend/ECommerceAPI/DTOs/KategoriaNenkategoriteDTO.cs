namespace ECommerceAPI.DTOs
{

    public class SubCategoryDTO
    {
        public int SubcategoryId { get; set; }
        public string SubCategoryName { get; set; }
    }

    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<SubCategoryDTO> SubCategory { get; set; }
    }

}
