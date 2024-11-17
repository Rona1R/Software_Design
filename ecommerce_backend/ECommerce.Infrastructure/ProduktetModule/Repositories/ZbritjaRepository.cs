using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ECommerce.Infrastructure.ProduktetModule.Repositories
{
    public class ZbritjaRepository : IZbritjaRepository
    {
        private readonly ECommerceDBContext _context;

        public ZbritjaRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task AddZbritjaAsync(ZbritjaVM newZbritja)
        {
            var zbritja = new Zbritja()
            {
                ZbritjaEmri = newZbritja.ZbritjaEmri,
                PerqindjaZbritjes=newZbritja.PerqindjaZbritjes,
                DataSkadimit=newZbritja.DataSkadimit,
              
            };

            await _context.Zbritja.AddAsync(zbritja);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ZbritjaDTO>> GetAllZbritjetAsync()
        {
            var zbritjet = await _context.Zbritja
               .OrderByDescending(r => r.DataKrijimit)
               .Select(r => new ZbritjaDTO
               {
                   Zbritja_ID=r.Zbritja_ID,
                   ZbritjaEmri=r.ZbritjaEmri,
                   PerqindjaZbritjes=r.PerqindjaZbritjes,
                   DataKrijimit=r.DataKrijimit, 
                   DataSkadimit=r.DataSkadimit

               }).ToListAsync();

            return zbritjet;
        }

        public async Task<Zbritja?> GetZbritjaByIdAsync(int id)
        {
            var zbritja = await _context.Zbritja
                .Where(z => z.Zbritja_ID == id)
                .OrderByDescending(z => z.DataKrijimit)
                
                .FirstOrDefaultAsync();
            return zbritja;
        }

        public async Task UpdateZbritjaAsync(Zbritja zbritja,ZbritjaVM zbritjaVM)
        {
            zbritja.ZbritjaEmri = zbritjaVM.ZbritjaEmri;    
            zbritja.PerqindjaZbritjes = zbritjaVM.PerqindjaZbritjes;
            zbritja.DataSkadimit = zbritjaVM.DataSkadimit;
            _context.Zbritja.Update(zbritja);
            await _context.SaveChangesAsync();
        }



    }
}
