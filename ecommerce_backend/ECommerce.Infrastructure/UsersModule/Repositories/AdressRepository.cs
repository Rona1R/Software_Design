using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Domain.UsersModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.UsersModule.Repositories
{
    public class AdressRepository(ECommerceDBContext context) : IAdressRepository
    {
        private readonly ECommerceDBContext _context = context;


        public int GetNrAdresave(int userId)
        {
            return _context.Adresa.Where(a => a.UserId == userId).Count();
        }

        public async Task<List<Adresa>> GetAdresatSipasUseritAsync(int userId)
        {
            return await _context.Adresa.Where(a => a.UserId == userId).OrderByDescending(a => a.CreatedAt).ToListAsync();
        }

        public async Task ShtoAdresenAsync(AdresaVM adresaVM)
        {
            var adresa = new Adresa()
            {
                Shteti = adresaVM.Shteti,
                Qyteti = adresaVM.Qyteti,
                AdresaUserit = adresaVM.Adresa,
                UserId = adresaVM.UserId,
                ZipKodi = adresaVM.ZipKodi,
                IsDefault = adresaVM.IsDefault,
            };

            if (adresaVM.IsDefault)
            {
                var adresat = await _context.Adresa.Where(a => a.UserId == adresaVM.UserId).ToListAsync();
                foreach (var adresaObj in adresat)
                {
                    adresaObj.IsDefault = false;
                }
            }

            await _context.Adresa.AddAsync(adresa);
            await _context.SaveChangesAsync();
        }


        public async Task PerditesoAdresenAsync(Adresa adresa, AdresaVM adresaVM)
        {

            if (adresaVM.IsDefault)
            {
                var adresat = await _context.Adresa.Where(a => a.UserId == adresaVM.UserId).ToListAsync();
                foreach (var adresaObj in adresat)
                {
                    adresaObj.IsDefault = false;
                }
            }
            if (adresa != null)
            {
                adresa.Shteti = adresaVM.Shteti;
                adresa.Qyteti = adresaVM.Qyteti;
                adresa.AdresaUserit = adresaVM.Adresa;
                adresa.ZipKodi = adresaVM.ZipKodi;
                adresa.IsDefault = adresaVM.IsDefault;

                _context.Adresa.Update(adresa);
                await _context.SaveChangesAsync();
            }

        }
        public async Task<Adresa?> GetAdresaSipasIdAsync(int adresaId)
        {
            return await _context.Adresa.FindAsync(adresaId);
        }

        public async Task FshijAdresenAsync(Adresa adresa)
        {
            _context.Adresa.Remove(adresa);
            await _context.SaveChangesAsync();
        }
    }
}
