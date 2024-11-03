using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.UsersModule.ViewModels
{
    public class UseriDetajetVM
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string ProfilePicture { get; set; }

        public string? BadgeName { get; set; }

        public int? BadgeId { get; set; }
    }
}
