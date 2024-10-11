using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Users.API.ViewModels
{
    public class Register
    {

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

    }
}
