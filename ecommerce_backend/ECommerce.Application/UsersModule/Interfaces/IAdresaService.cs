using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Domain.UsersModule.Entities;

namespace ECommerce.Application.UsersModule.Interfaces
{ 
    public interface IAdresaService
    {

        Task ShtoAdresenAsync(AdresaVM adresaVM);

        Task PerditesoAdresenAsync(int adresaId, AdresaVM adresaVM);

        Task<Adresa?> GetAdresenSipasIdAsync(int adresaId);

        Task FshijAdresenAsync(int adresaId);

        Task<List<Adresa>> GetAdresatSipasIdAsync(int userId);

    }

}
