using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Domain.KataloguModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.KataloguModule.Repositories
{
    public class NenkategoriaRepository : INenkategoriaRepository
    {

        private readonly ECommerceDBContext _context;

        public NenkategoriaRepository(ECommerceDBContext context)
        {
            _context = context; 
        }

        public async Task<NenKategoria?> GetByIdAsync(int id)
        {
            return await _context.NenKategoria.Include(n=>n.Kategoria).FirstOrDefaultAsync(n=>n.NenKategoria_ID == id);
        }

        public async Task<bool> NenkategoriaEkziston(string emri) // backend validim per post 
        {
            return await _context.NenKategoria.AnyAsync(k => k.EmriNenkategorise!.ToLower().Equals(emri.ToLower()));
        }

        public async Task<bool> NenkategoriaEkziston(string emri,int id) // backend validim per put
        {
            return await _context.NenKategoria.AnyAsync(k => k.EmriNenkategorise!.ToLower().Equals(emri.ToLower()) && k.NenKategoria_ID != id);
        }

        public async Task CreateAsync(NenKategoriaVM nenkategoria)
        {

            var nk = new NenKategoria()
            {
                EmriNenkategorise = nenkategoria.Emri,
                Kategoria_ID = nenkategoria.KategoriaID
            };

            await _context.NenKategoria.AddAsync(nk);
            await _context.SaveChangesAsync();

        }

        public async Task<List<NenKategoriaDTO>> GetAllAsync()
        {
            return await  _context.NenKategoria
                .OrderByDescending(nk => nk.CreatedAt)
                .Select(nk => new NenKategoriaDTO
                {
                    Id = nk.NenKategoria_ID,
                    Emri = nk.EmriNenkategorise,
                    Kategoria = nk.Kategoria.EmriKategorise,
                    KategoriaID = nk.Kategoria.Kategoria_ID
                })
                 .ToListAsync();
        }

        public async Task<List<NenKategoriaDTO>> GetByCategoryAsync(int id)
        {
            return await _context
                .NenKategoria
                .OrderBy(nk => nk.CreatedAt)
                .Where(nk => nk.Kategoria_ID == id)
                .Select(nk => new NenKategoriaDTO
                {
                    Id = nk.NenKategoria_ID,
                    Emri = nk.EmriNenkategorise,
                    Kategoria = nk.Kategoria.EmriKategorise,
                    KategoriaID = nk.Kategoria.Kategoria_ID

                }).ToListAsync();
        }
    }
}
