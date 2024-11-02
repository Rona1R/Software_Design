namespace ECommerceAPI.ViewModels
{
    public class ReviewVM
    {
        public int? Rating { get; set; }

        public string? ReviewContent { get; set; }

        public int? Produkti_ID { get; set; }  
        public int? User_Id { get; set; }
    }
}
