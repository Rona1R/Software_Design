using ECommerce.Application.UsersModule.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.UsersModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UseriRoletController : ControllerBase
    {
        private readonly IUseriRoletService _useriRoletService;

        public UseriRoletController(IUseriRoletService useriRoletService)
        {
           _useriRoletService = useriRoletService;   
        }


        [HttpGet]
        [Route("GetAllUsers")]
   //     [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {

            var usersWithRoles = await _useriRoletService.GetAllUsersWithRolesAsync();
            return Ok(usersWithRoles);
        }


        [HttpPost]
        [Route("shtoRolinUserit/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShtoRolinUserit(string userId, [FromBody] RoliDTO roliDto)
        {
            var aspNetUser = await _useriRoletService.GetAspNetUserAsync(userId);
            if (aspNetUser == null)
            {
                return BadRequest("Ky perdorues nuk u gjet ne sistem!");
            }

            var result = await _useriRoletService.AddRoleToIdentityUserAsync(userId, roliDto.Roli);
            if (result.Succeeded)
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
            var aspNetUser = await _useriRoletService.GetAspNetUserAsync(userId);
            if (aspNetUser == null)
            {
                return BadRequest("Ky perdorues nuk u gjet ne sistem!");
            }

            var result = await _useriRoletService.RemoveRoleFromIdentityUserAsync(userId, roliDto.Roli);
            if (result.Succeeded)
            {
                return Ok("Roli i eshte larguar perdoruesit me sukses!");
            }
            else
            {
                return BadRequest("Ndodhi nje gabim ne server gjate largimit te rolit");
            }
        }


        [HttpGet]
        [Route("shfaqRoletPerTuShtuar/{userId}")] // mi shfaq rolet qe nuk i ka ky perdorues ne dropdown per shtim te roleve!
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShfaqRoletPerTuShtuar(string userId)
        {
            try
            {
                var rolesNotAssigned = await _useriRoletService.GetRolesNotAssignedToUserAsync(userId);
                return Ok(rolesNotAssigned);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("shfaqRoletPerTuFshire/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShfaqRoletPerTuFshire(string userId)
        {
            try
            {
                var rolesForDeletion = await _useriRoletService.GetRolesForDeletionAsync(userId);
                return Ok(rolesForDeletion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("getAspNetUser/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAspNetUser(string userId)
        {
            var aspNetUser = await _useriRoletService.GetAspNetUserAsync(userId);
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
