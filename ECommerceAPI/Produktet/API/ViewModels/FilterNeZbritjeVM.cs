namespace ECommerceAPI.Produktet.API.ViewModels
{
    public class FilterNeZbritjeVM
    {
        public string[] SelectedSubCategories { get; set; }

        public decimal[] PriceRange { get; set; }

        public string SearchTerm { get; set; }
    }
}
