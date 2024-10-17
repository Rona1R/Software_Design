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
        public async Task ShtoAdresen(AdresaVM adresaVM)
        {
            var numriAdresave = _adresaRepository.GetNrAdresave(adresaVM.UserId);
            if(numriAdresave == 3) {
                throw new Exception("Numri i adresave qe mund te shtoni eshte maximumi 3!");
            }

            await _adresaRepository.ShtoAdresen(adresaVM);
        }

        public async Task PerditesoAdresen(int adresaId, AdresaVM adresaVM)
        {
            var adresa = await _adresaRepository.GetAdresaSipasId(adresaId);

            if (adresa != null)
            {

                await _adresaRepository.PerditesoAdresen(adresa, adresaVM);
            }
        }

        public async Task<Adresa?> GetAdresenSipasId(int adresaId)
        {

            return await _adresaRepository.GetAdresaSipasId(adresaId);
        }

        public async Task FshijAdresen(int adresaId)
        {
            var adresa = await _adresaRepository.GetAdresaSipasId(adresaId);
            if (adresa != null)
            {
                await _adresaRepository.FshijAdresen(adresa);
            }
        }

        public async Task<List<Adresa>> GetAdresatSipasId(int userId)
        {
            return await _adresaRepository.GetAdresatSipasUserit(userId);
        }
    }
}