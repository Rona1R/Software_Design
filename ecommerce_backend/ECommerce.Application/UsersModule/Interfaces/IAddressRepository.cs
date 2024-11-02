using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Domain.UsersModule.Entities;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IAdressRepository
    {
        int GetNrAdresave(int userId);

        Task<List<Adresa>> GetAdresatSipasUseritAsync(int userId);


        Task ShtoAdresenAsync(AdresaVM adresaVM);

        Task<Adresa?> GetAdresaSipasIdAsync(int adresaId);

        Task PerditesoAdresenAsync(Adresa adresa, AdresaVM adresaVM);
        Task FshijAdresenAsync(Adresa adresa);
    }
}
