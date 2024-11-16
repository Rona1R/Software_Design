using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
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
            return await _context.NenKategoria.Include(n=>n.Kategoria).Include(n=>n.Produkti).FirstOrDefaultAsync(n=>n.NenKategoria_ID == id);
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
                    KategoriaID = nk.Kategoria_ID
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
                    KategoriaID = nk.Kategoria_ID

                }).ToListAsync();
        }

        public async Task<KategoriaSidebarData> GetSidebarDataAsync(int id)
        {
            var products = await _context.Produkti
             .Include(p => p.Kompania)
             .Where(p => p.NenKategoria_ID == id)
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

        public async Task<ProduktetSipasNenkategorise> GetProductsBySubCategoryAsync(int id, string sortBy,int pageNumber,int pageSize,FiltersDTO filters)
        {
            var selectedCompanies = filters.SelectedCompanies;
            decimal? minPrice = null;
            decimal? maxPrice = null;

            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            var totalProductsCount = await _context.NenKategoria
           .Where(k => k.NenKategoria_ID == id)
           .SelectMany(k => k.Produkti.Where(p => p.NeShitje == true
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
           )
           .CountAsync();

            var productsQuery = _context.NenKategoria
                .Where(k => k.NenKategoria_ID == id)
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
                    .Select(p => new ProduktetNenkategoriseDTO
                    {
                        Id = p.Produkti_ID,
                        Name = p.EmriProdukti,
                        Description = p.PershkrimiProduktit,
                        Img = p.FotoProduktit,
                        Cost = p.CmimiPerCope,
                        Company = p.Kompania.Kompania_Emri,
                        CompanyId = p.Kompania_ID,
                        Stock = p.SasiaNeStok,
                        CmimiMeZbritje = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                           ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                           : null,
                        Rating = p.Review.Any() ? (int)Math.Round(p.Review.Average(r => (double)r.Rating)) : null,
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

            var subcategory = await GetByIdAsync(id);

            var teDhenat = new NenkategoriaMeProduktetDTO
            {
                SubcategoryId = id,
                SubCategoryName = subcategory.EmriNenkategorise,
                Category = subcategory.Kategoria.EmriKategorise,
                Products = pagedProducts
            };

            return new ProduktetSipasNenkategorise
            {
                TotalCount = totalProductsCount,
                TeDhenat = teDhenat,
            };
        }

        public async Task UpdateAsync(NenKategoria n, NenKategoriaVM nenkategoria)
        {
            n.EmriNenkategorise = nenkategoria.Emri;

            if(n.Kategoria_ID != nenkategoria.KategoriaID)
            {
                foreach(var product in n.Produkti)
                {
                    product.Kategoria_ID = nenkategoria.KategoriaID;
                }

                n.Kategoria_ID = nenkategoria.KategoriaID;
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(NenKategoria nenkategoria)
        {
            foreach (var product in nenkategoria.Produkti)
            {
                _context.Produkti.Remove(product);
            }

            _context.NenKategoria.Remove(nenkategoria);
            await _context.SaveChangesAsync();
        }


    }
}
