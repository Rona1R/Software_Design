using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IBadgeRepository
    {
        Task<AchievementBadge?> GetBadge(int id);

        Task<AchievementBadge?> GetBadgeByName(string name);

        Task<List<AchievementBadge>> GetAllBadges();
        Task AddNewBadge(string name);

        Task UpdateBadge(AchievementBadge badge, string name);

        Task DeleteBadge(AchievementBadge badge);
    }
}
