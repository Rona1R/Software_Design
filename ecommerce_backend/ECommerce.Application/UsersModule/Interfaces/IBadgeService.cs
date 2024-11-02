using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IBadgeService
    {
        Task<AchievementBadge?> GetAchievementBadge(int id);

        Task<string> AddBadge(string badgeName);

        Task<List<AchievementBadge>> GetAllBadgesAsync();

        Task UpdateBadge(int id, string name);

        Task DeleteBadge(int id);

    }
}
