using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Domain.KataloguModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.KataloguModule.Repositories
{
    public class KategoriaRepository : IKategoriaRepository
    {
        private readonly ECommerceDBContext _context;

        public KategoriaRepository(ECommerceDBContext context) { 
            _context = context; 
        }

        public async Task CreateCategoryAsync(KategoriaVM kategoria)
        {
            var k = new Kategoria()
            {
                EmriKategorise = kategoria.Emri,
                Pershkrimi = kategoria.Pershkrimi
            };

            await _context.Kategoria.AddAsync(k);
            await _context.SaveChangesAsync();
        }


        public async Task<List<KategoriaDTO>> GetAllAsync()
        {
           return await _context.Kategoria
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => new KategoriaDTO
                {
                    Id = k.Kategoria_ID,
                    Emri = k.EmriKategorise,
                    Pershkrimi = k.Pershkrimi
                })
                 .ToListAsync();
        }

        public async Task<List<CategoryDTO>> GetKategoriteNenkategoriteAsync()
        {
            var teDhenat =
                    await _context.Kategoria
                 //   .Include(k => k.NenKategoria)
                    .OrderByDescending(k => k.CreatedAt)
                    .Select(k => new CategoryDTO
                    {
                        CategoryId = k.Kategoria_ID,
                        CategoryName = k.EmriKategorise,
                        SubCategory = k.NenKategoria.Select(
                            nk => new SubCategoryDTO
                            {
                                SubcategoryId = nk.NenKategoria_ID,
                                SubCategoryName = nk.EmriNenkategorise
                            }
                            ).ToList()
                    }
                    ).ToListAsync();
            return teDhenat;
        }
    }
}
