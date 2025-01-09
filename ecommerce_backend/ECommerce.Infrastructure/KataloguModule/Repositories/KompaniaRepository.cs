using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.KataloguModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.KataloguModule.Repositories
{
    public class KompaniaRepository : IKompaniaRepository
    {

        private readonly ECommerceDBContext _context;

        public KompaniaRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task<Kompania?> GetByIdAsync(int id)
        {
            return await _context.Kompania.FindAsync(id);
        }

        public async Task CreateAsync(KompaniaVM kompania)
        {

            var k = new Kompania()
            {
                Kompania_Emri = kompania.Emri,
            };

            await _context.Kompania.AddAsync(k);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> NameTaken(string name) // validation for create
        {
            return await _context.Kompania.AnyAsync(k => k.Kompania_Emri.ToLower().Equals(name.ToLower()));
        }

        public async Task<bool> NameTaken(string name,int id) // validation for edit
        {
            return await _context.Kompania.AnyAsync(k => k.Kompania_Emri.ToLower().Equals(name.ToLower()) && k.Kompania_ID != id);
        }

        public async Task<List<KompaniaDTO>> GetAllAsync()
        {
            return  await _context.Kompania
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => new KompaniaDTO
                {
                    Id = k.Kompania_ID,
                    Emri = k.Kompania_Emri

                })
                 .ToListAsync();
        }

        public async Task<List<KompaniaDTO>> GetCompaniesAndCategoriesAsync()
        {
            return await _context.Kompania
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => new KompaniaDTO
                {
                    Id = k.Kompania_ID,
                    Emri = k.Kompania_Emri ?? "Not provided",

                    CompanyCategories = k.Produkti.Select(p => new KompaniaKategoriteDTO
                    {
                        CategoryId = p.Kategoria_ID,
                        CategoryName = p.Kategoria.EmriKategorise
                    }
                    ).GroupBy(c => c.CategoryId)
                     .Select(g => g.First()).ToList()
                }).ToListAsync();
        }

        public async Task<KompaniaSidebarData> GetSidebarDataAsync(int id)
        {
            var products = await _context.Produkti
             .Include(p => p.Kategoria)
             .Include(p => p.NenKategoria)
             .Where(p => p.Kompania_ID == id)
             .ToListAsync();

            var transformedCategories = products
             .GroupBy(p => new { p.Kategoria.Kategoria_ID, p.Kategoria.EmriKategorise })
             .Select(g => new KategoriaNenkategoriteDTO
             {
                 CategoryId = g.Key.Kategoria_ID,
                 CategoryName = g.Key.EmriKategorise,
                 SubCategory = g.Select(p => new SubCategoryDTO
                 {
                     SubcategoryId = p.NenKategoria.NenKategoria_ID,
                     SubCategoryName = p.NenKategoria.EmriNenkategorise
                 })
                 .DistinctBy(p => new { p.SubcategoryId }).ToList()
             })
             .ToList();

            decimal? maxPrice = products.Any() ? products.Max(p => p.CmimiPerCope) : null;

            return new KompaniaSidebarData
            {
                Categories = transformedCategories,
                MaxPrice = maxPrice
            };
        }


        public async Task<KompaniaProduktetResponse> GetProductsByCompanyAsync(int id,string sortBy,int pageNumber,int pageSize, FilterNeZbritjeVM filters)
        {
            var selectedSubCategories = filters.SelectedSubCategories;
            decimal? minPrice = null;
            decimal? maxPrice = null;

            //var productsQuery = _context.Kompania
            //    .Where(k => k.Kompania_ID == id)
            //    .SelectMany(k => k.Produkti
              var productsQuery = _context.Produkti
                    .Where(p => p.NeShitje == true && p.Kompania_ID == id
                           && (string.IsNullOrEmpty(filters.SearchTerm) || p.EmriProdukti.Contains(filters.SearchTerm))
                        && (selectedSubCategories.Length == 0 || selectedSubCategories.Contains(p.NenKategoria.EmriNenkategorise)) // Filter by company
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
                    .Select(p => new ProduktetKompaniseDTO
                    {
                        Id = p.Produkti_ID,
                        Name = p.EmriProdukti,
                        Description = p.PershkrimiProduktit,
                        Img = p.FotoProduktit,
                        Cost = p.CmimiPerCope,
                        Stock = p.SasiaNeStok,
                        Category = p.Kategoria.EmriKategorise,
                        CategoryId = p.Kategoria_ID,
                        Subcategory = p.NenKategoria.EmriNenkategorise,
                        SubcategoryId = p.NenKategoria_ID,
                        CmimiMeZbritje = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                           ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                           : null,
                        Rating = p.Review.Any() ? (int)Math.Round(p.Review.Average(r => (double)r.Rating)) : null,
                    });

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

            var teDhenat = new ProduktetSipasKompanise
            { 
                Id = id,
                Name = (await GetByIdAsync(id))?.Kompania_Emri?? "Unknown",
                Products = pagedProducts
            };

            return new KompaniaProduktetResponse
            {
                TeDhenat = teDhenat,
                TotalCount = productsQuery.Count()
            };
        }


        public async Task<KompaniaKategoriaSidebarData> GetSidebarDataAsync(int companyId,int categoryId)
        {
            var products = await _context.Produkti
                .Include(p => p.NenKategoria)
                .Where(p => p.Kompania_ID == companyId && p.Kategoria_ID == categoryId)
                .ToListAsync();

            decimal? maxPrice = products.Any() ? products.Max(p => p.CmimiPerCope) : null;

            var uniqueSubcategories = products
                .Select(p => new SubCategoryDTO
                {
                    SubcategoryId = p.NenKategoria.NenKategoria_ID,
                    SubCategoryName = p.NenKategoria.EmriNenkategorise?? "Unknown"
                })
                .DistinctBy(p => new { p.SubcategoryId }).ToList();

            return new KompaniaKategoriaSidebarData
            {
                MaxPrice = maxPrice,
                Subcategories = uniqueSubcategories
            };
        }

        public async Task<KompaniaKategoriaResponse> GetProductsByCompanyCategoryAsync(int companyId,int categoryId,string sortBy,int pageNumber,int pageSize,FilterNeZbritjeVM filters)
        {
            var selectedSubCategories = filters.SelectedSubCategories;
            decimal? minPrice = null;
            decimal? maxPrice = null;

            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            //var productsQuery = _context.Kompania
            //.Where(k => k.Kompania_ID == companyId)
            //.SelectMany(k => k.Produkti
            var productsQuery = _context.Produkti
              .Where(p => p.NeShitje == true && p.Kategoria_ID == categoryId && p.Kompania_ID == companyId 
                                  && (string.IsNullOrEmpty(filters.SearchTerm) || p.EmriProdukti.Contains(filters.SearchTerm))
                  && (selectedSubCategories.Length == 0 || selectedSubCategories.Contains(p.NenKategoria.EmriNenkategorise)) // Filter by company
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
          .Select(p => new ProduktetKompaniseKategoriseDTO
          {
              Id = p.Produkti_ID,
              Name = p.EmriProdukti,
              Description = p.PershkrimiProduktit,
              Img = p.FotoProduktit,
              Cost = p.CmimiPerCope,
              Stock = p.SasiaNeStok,
              Subcategory = p.NenKategoria.EmriNenkategorise,
              SubcategoryId = p.NenKategoria_ID,
              CmimiMeZbritje = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                 ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                 : null,
              Rating = p.Review.Any() ? (int)Math.Round(p.Review.Average(r => (double)r.Rating)) : null,
          });

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

            var teDhenat = new KompaniaKategoriaMeProduktetDTO
            {
                Id = companyId,
                Name = (await _context.Kompania.FindAsync(companyId))?.Kompania_Emri,
                CategoryId = categoryId,
                CategoryName = (await _context.Kategoria.FindAsync(categoryId))?.EmriKategorise,
                Products = pagedProducts
            };

            return new KompaniaKategoriaResponse
            {
                TeDhenat = teDhenat,
                TotalCount = productsQuery.Count(),
            };
        }

        public async Task UpdateAsync(Kompania kompania,KompaniaVM kompaniaVM)
        {
            kompania.Kompania_Emri = kompaniaVM.Emri;
            _context.Kompania.Update(kompania);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Kompania kompania)
        {
            _context.Kompania.Remove(kompania);
            await _context.SaveChangesAsync();
        }

    }
}
