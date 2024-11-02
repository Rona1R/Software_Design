using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.UsersModule.Repositories
{

    public class BadgeRepository : IBadgeRepository
    {
        private readonly ECommerceDBContext _context;
        public BadgeRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task<AchievementBadge?> GetBadge(int id)
        {
            return await _context.AchievementBadge.FirstOrDefaultAsync(b => b.Badge_Id == id);

        }

        public async Task<AchievementBadge> GetBadgeByName(string name)
        {
            return await _context.AchievementBadge.FirstOrDefaultAsync(b => b.Badge_Name.ToLower() == name.ToLower());
        }

        public async Task AddNewBadge(string name)
        {
            var newBadge = new AchievementBadge { Badge_Name = name };
            await _context.AchievementBadge.AddAsync(newBadge);
            await _context.SaveChangesAsync();
        }

        public async Task<List<AchievementBadge>> GetAllBadges()
        {

            var badges = await _context.AchievementBadge.OrderByDescending(b => b.CreatedAt).ToListAsync();
            return badges;
        }

        public async Task UpdateBadge(AchievementBadge badge, string newName)
        {
            badge.Badge_Name = newName;
            _context.AchievementBadge.Update(badge);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBadge(AchievementBadge badge)
        {
            _context.AchievementBadge.Remove(badge);
            await _context.SaveChangesAsync();
        }
    }
}
