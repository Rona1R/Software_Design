using ECommerceAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Users.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UseriRoletController : ControllerBase
    {

        private readonly ECommerceDBContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public UseriRoletController(UserManager<IdentityUser> userManager, ECommerceDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var users = await _context.User
           .Select(u => new
           {
               Id = u.User_Id,
               Username = u.AspNetUser.UserName,
               u.AspNetUserId,
               //  Roles = _userManager.GetRolesAsync(u.AspNetUser).Result,  
               AchievementBadge = u.AchievementBadge != null ? u.AchievementBadge.Badge_Name : "Unavailable",
               u.AspNetUser.Email,
               PhoneNumber = u.AspNetUser.PhoneNumber ?? "Not Provided"
           })
           .ToListAsync();

            var usersWithRoles = new List<object>();

            foreach (var user in users)
            {
                var aspNetUser = await _userManager.FindByIdAsync(user.AspNetUserId);
                var roles = await _userManager.GetRolesAsync(aspNetUser);
                usersWithRoles.Add(new
                {
                    user.Id,
                    user.AspNetUserId,
                    user.Username,
                    Roli = roles,
                    user.AchievementBadge,
                    user.Email,
                    user.PhoneNumber
                });
            }


            return Ok(usersWithRoles);
        }


        [HttpPost]
        [Route("shtoRolinUserit/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShtoRolinUserit(string userId, [FromBody] RoliDTO roliDto)
        {

            var aspNetUser = await _userManager.FindByIdAsync(userId);

            if (aspNetUser == null)
            {
                return BadRequest("Ky perdorues nuk u gjet ne sistem!");
            }

            var shtimiRolit = await _userManager.AddToRoleAsync(aspNetUser, roliDto.Roli);

            if (shtimiRolit.Succeeded)
            {
                return Ok("Roli eshte shtuar perdoruesit me sukses");
            }
            else
            {
                return BadRequest("Ndodhi nje gabim ne server gjate shtimit te rolit");
            }
        }

        [HttpDelete]
        [Route("largoRolinPerdoruesit/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> LargoRolinPerdoruesit(string userId, [FromBody] RoliDTO roliDto)
        {
            var aspNetUser = await _userManager.FindByIdAsync(userId);

            if (aspNetUser == null)
            {
                return BadRequest("Ky perdorues nuk u gjet ne sistem!");
            }

            var largimiRolit = await _userManager.RemoveFromRoleAsync(aspNetUser, roliDto.Roli);

            if (largimiRolit.Succeeded)
            {
                return Ok("Roli eshte larguar me sukses");
            }
            else
            {
                return BadRequest("Ndodhi nje gabim ne server gjate largimit te rolit!");
            }

        }


        [HttpGet]
        [Route("shfaqRoletPerTuShtuar/{userId}")] // mi shfaq rolet qe nuk i ka ky perdorues ne dropdown per shtim te roleve!
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShfaqRoletPerTuShtuar(string userId)
        {
            var aspNetUser = await _userManager.FindByIdAsync(userId);
            if (aspNetUser == null)
            {
                return BadRequest("Ky perdorues nuk u gjet ne sistem!");
            }

            var roletUserit = await _userManager.GetRolesAsync(aspNetUser);

            var allRoles = await _context.Roles.Select(r => r.Name).ToListAsync();

            var rolesNotAssigned = allRoles.Except(roletUserit).ToList();

            return Ok(rolesNotAssigned);
        }

        [HttpGet]
        [Route("shfaqRoletPerTuFshire/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShfaqRoletPerTuFshire(string userId)
        {

            var aspNetUser = await _userManager.FindByIdAsync(userId);
            if (aspNetUser == null)
            {
                return BadRequest("Ky perdorues nuk u gjet ne sistem!");
            }

            var roletUserit = await _userManager.GetRolesAsync(aspNetUser);

            // nuk duhet roli user me u shfaq si opsion ne dropdown per tu fshire !!

            var rolesExcludingUser = roletUserit.Where(role => role != "User").ToList();

            return Ok(rolesExcludingUser);

        }

        [HttpGet]
        [Route("getAspNetUser/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAspNetUser(string userId)
        {
            var aspNetUser = await _userManager.FindByIdAsync(userId);
            if (aspNetUser == null)
            {
                return BadRequest("Ky perdorues nuk u gjet ne sistem!");
            }

            return Ok(aspNetUser);
        }
    }


    public class RoliDTO
    {
        public string Roli { get; set; }
    }

}
