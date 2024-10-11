using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Data;
using Microsoft.AspNetCore.Authorization;
using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementBadgeController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public AchievementBadgeController(ECommerceDBContext context)
        {
            _context = context;
        }

        // Reminder : constraint mes Userit dhe Achievement Badge : setNull , prandaj nfront duhet mu handle case nese e ka null Achievement Badge Id
        // edhe ne Register masi te shtoj achievement badge e boj qe me u insertu me achievement badge : new User (Badge_Id : 1) // ne front me bo disable Delete butonin te New User Badge

        [HttpPost]
        [Route("shtoBadge/{badgeName}")]
        [Authorize(Roles ="Admin,Menaxher")]
        public async Task<IActionResult> Post(string badgeName)
        {
            var ekziston = await _context.AchievementBadge.FirstOrDefaultAsync(b=>b.Badge_Name.ToLower()== badgeName.ToLower());    
            if (ekziston == null) {
                var newBadge = new AchievementBadge()
                {
                    Badge_Name = badgeName,
                };

                await _context.AchievementBadge.AddAsync(newBadge); 
                await _context.SaveChangesAsync();
                return Ok("Achievement Badge u shtua me sukses!");
            }

            return BadRequest("Ekziston nje Achievement Badge me emer te tille");
        }

        [HttpGet]
        [Route("shfaqBadges")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var badges = await _context.AchievementBadge.OrderByDescending(b=>b.CreatedAt)
                .Select(b=> new
                {
                    b.Badge_Id,
                    b.Badge_Name
                }).ToListAsync();   
                ; 
            return Ok(badges);  
        }

        [HttpGet]
        [Route("shfaqBadgeSipasId/{id}")]
        [Authorize(Roles ="Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var ekziston = await _context.AchievementBadge.
                Where(b=>b.Badge_Id == id)
                 .Select(b => new
                 {
                     b.Badge_Id,
                     b.Badge_Name
                 }).FirstOrDefaultAsync();  

            if (ekziston == null) {
                return BadRequest("Kjo Badge nuk u gjet ne sistem.");
            }
            return Ok(ekziston);    

        }

        [HttpPut]
        [Route("perditesoBadge/{id}/{newName}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post(int id ,string newName)
        {
            var ekziston = await _context.AchievementBadge.FirstOrDefaultAsync(b => b.Badge_Id == id);
            if (ekziston == null)
            {
                return BadRequest("Kjo Badge nuk u gjet ne sistem.");
            }

            ekziston.Badge_Name = newName;
            _context.AchievementBadge.Update(ekziston); 
            await _context.SaveChangesAsync();
            return Ok("Achievement Badge u perditesua me sukses");

        }

        [HttpDelete]
        [Route("fshijBadge/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var ekziston = await _context.AchievementBadge.FirstOrDefaultAsync(x=>x.Badge_Id == id);

            if(ekziston == null) {
                return BadRequest("Kjo Badge nuk u gjet ne sistem.");
            }

            _context.AchievementBadge.Remove(ekziston);
            await _context.SaveChangesAsync();
            return Ok("Achievement Badge u fshie me sukses");

        }


    }
}
