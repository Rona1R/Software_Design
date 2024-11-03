using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.UsersModule.ViewModels
{
    public class CheckoutDetails
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string? PhoneNumber { get; set; }

        public List<AdresaUserVM> Adresat { get; set; }
    }

    public class AdresaUserVM
    {
        public string AdresaUserit { get; set; }

        public string Shteti { get; set; }

        public string Qyteti { get; set; }

        public string ZipKodi { get; set; }

        public bool IsDefault { get; set; }

    }
}
