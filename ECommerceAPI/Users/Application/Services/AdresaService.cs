using ECommerceAPI.Users.API.ViewModels;
using ECommerceAPI.Users.Application.Interfaces;
using ECommerceAPI.Users.Domain.Entities;
using ECommerceAPI.Users.Domain.Interfaces;

namespace ECommerceAPI.Users.Application.Services
{
    public class AdresaService:IAdresaService
    {

        private readonly IAdressRepository _adresaRepository;

        public AdresaService(IAdressRepository adresaRepository)
        {
            _adresaRepository = adresaRepository;   
        }
        public async Task ShtoAdresenAsync(AdresaVM adresaVM)
        {
            var numriAdresave = _adresaRepository.GetNrAdresave(adresaVM.UserId);
            if(numriAdresave == 3) {
                throw new Exception("Numri i adresave qe mund te shtoni eshte maximumi 3!");
            }

            await _adresaRepository.ShtoAdresenAsync(adresaVM);
        }

        public async Task PerditesoAdresenAsync(int adresaId, AdresaVM adresaVM)
        {
            var adresa = await _adresaRepository.GetAdresaSipasIdAsync(adresaId);

            if (adresa != null)
            {

                await _adresaRepository.PerditesoAdresenAsync(adresa, adresaVM);
            }
        }

        public async Task<Adresa?> GetAdresenSipasIdAsync(int adresaId)
        {

            return await _adresaRepository.GetAdresaSipasIdAsync(adresaId);
        }

        public async Task FshijAdresenAsync(int adresaId)
        {
            var adresa = await _adresaRepository.GetAdresaSipasIdAsync(adresaId);
            if (adresa != null)
            {
                await _adresaRepository.FshijAdresenAsync(adresa);
            }
        }

        public async Task<List<Adresa>> GetAdresatSipasIdAsync(int userId)
        {
            return await _adresaRepository.GetAdresatSipasUseritAsync(userId);
        }
    }
}