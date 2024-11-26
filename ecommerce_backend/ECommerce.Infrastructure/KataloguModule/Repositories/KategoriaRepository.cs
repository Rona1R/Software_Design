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

        public async Task<List<KategoriaNenkategoriteDTO>> GetKategoriteNenkategoriteAsync()
        {
            var teDhenat =
                    await _context.Kategoria
                 //   .Include(k => k.NenKategoria)
                    .OrderByDescending(k => k.CreatedAt)
                    .Select(k => new KategoriaNenkategoriteDTO
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

        public async Task<Kategoria?> GetCategoryByIdAsync(int id)
        {
            return await _context.Kategoria.FindAsync(id);
        }

        public async Task<KategoriaSidebarData> GetSidebarDataAsync(int id)
        {
            var products = await _context.Produkti
             .Include(p => p.Kompania)
             .Where(p => p.Kategoria_ID == id)
             .ToListAsync();

            var companyNames = products
                .Select(p => p.Kompania.Kompania_Emri)
                .Distinct()
                .Select(name => new CompanyName { Name = name })
                .ToList();

            var maxPrice = products.Max(p => p.CmimiPerCope);

            var result = new KategoriaSidebarData
            {
                CompanyNames = companyNames,
                MaxPrice = maxPrice
            };

            return result;
        }

        public async Task<ProduktetSipasKategoriseResponse> GetProductsByCategoryAsync(int id,string sortBy,int pageNumber,int pageSize,FiltersDTO filters)
        {

            var selectedCompanies = filters.SelectedCompanies;
            decimal? minPrice = null;
            decimal? maxPrice = null;


            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            var productsQuery = _context.Kategoria
            .Where(k => k.Kategoria_ID == id)
            .SelectMany(k => k.Produkti
                .Where(p => p.NeShitje == true
                                        && (string.IsNullOrEmpty(filters.SearchTerm) || p.EmriProdukti.Contains(filters.SearchTerm))
                    && (selectedCompanies.Length == 0 || selectedCompanies.Contains(p.Kompania.Kompania_Emri)) // Filter by company
                    && (
                        !minPrice.HasValue || p.CmimiPerCope >= minPrice // Regular price meets minimum price
                        || p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                            && p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope >= minPrice // Discounted price meets minimum price
                       )
                    && (
                        !maxPrice.HasValue || p.CmimiPerCope <= maxPrice // Regular price meets maximum price
                        || p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                            && p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope <= maxPrice // Discounted price meets maximum price
                   )
            )
            .Select(p => new ProduktetKategoriseDTO
            {
                Id = p.Produkti_ID,
                Name = p.EmriProdukti,
                Description = p.PershkrimiProduktit,
                Img = p.FotoProduktit,
                Cost = p.CmimiPerCope,
                Company = p.Kompania.Kompania_Emri,
                Subcategory = p.NenKategoria.EmriNenkategorise,
                CompanyId = p.Kompania_ID,
                SubcategoryId = p.NenKategoria_ID,
                Stock = p.SasiaNeStok,
                CmimiMeZbritje = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                    ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                    : null,
                Rating = p.Review.Any() ? (int)Math.Round(p.Review.Average(r => (double)r.Rating)) : null
            }));

            productsQuery = sortBy.ToLower() switch
            {
              "asc" => productsQuery.OrderBy(p => p.Cost),
              "desc" => productsQuery.OrderByDescending(p => p.Cost),
               _ => throw new ArgumentException("Invalid sorting order. Use 'asc' or 'desc'.")
            };

                   
            var pagedProducts = await productsQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var teDhenat = new KategoriaMeProduktetDTO
            {
                Id = id,
                Name = (await _context.Kategoria.FindAsync(id))?.EmriKategorise,
                Products = pagedProducts
            };

            return new ProduktetSipasKategoriseResponse
            {
                TeDhenat = teDhenat,
                TotalCount = productsQuery.Count(),
            };
        }

        public async Task<bool> KategoriaEkziston(string emri)
        {
            return await _context.Kategoria.AnyAsync(k=>k.EmriKategorise!.ToLower().Equals(emri.ToLower()));
        }

        public async Task<bool> KategoriaEkziston(int id,string emri)
        {
            return await _context.Kategoria.AnyAsync(k => k.Kategoria_ID !=id && k.EmriKategorise!.ToLower().Equals(emri.ToLower()));
        }

        public async Task UpdateCategoryAsync(Kategoria kategoria,KategoriaVM kategoriaVM)
        {
            kategoria.EmriKategorise = kategoriaVM.Emri;
            kategoria.Pershkrimi = kategoriaVM.Pershkrimi;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(Kategoria kategoria)
        {
            _context.Kategoria.Remove(kategoria);
            await _context.SaveChangesAsync();
        }
    }
}
