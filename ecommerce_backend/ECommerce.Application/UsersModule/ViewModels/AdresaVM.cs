using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.UsersModule.ViewModels
{
    public class AdresaVM
    {
        public string Adresa { get; set; }


        public string Shteti { get; set; }

        public string Qyteti { get; set; }

        public string ZipKodi { get; set; }

        public Boolean IsDefault { get; set; }

        public int UserId { get; set; }
    }
}
