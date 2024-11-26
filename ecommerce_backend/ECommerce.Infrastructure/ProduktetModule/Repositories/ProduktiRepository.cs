using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ECommerce.Infrastructure.ProduktetModule.Repositories
{
    public class ProduktiRepository:IProduktiRepository
    {
        private readonly ECommerceDBContext _context;
   
        public ProduktiRepository(
            ECommerceDBContext dbContext
        )
        {
            _context = dbContext;
        }

        public async Task AddProductAsync(ProduktiVM produkti)
        {
            var p = new Produkti() // objekti Produkti
            {
                EmriProdukti = produkti.Emri,
                FotoProduktit = produkti.Foto,
                PershkrimiProduktit = produkti.Pershkrimi,
                SasiaNeStok = produkti.Stoku,
                CmimiPerCope = produkti.Cmimi,
                Kompania_ID = produkti.Kompania_ID,
                Kategoria_ID = produkti.Kategoria_ID,
                NenKategoria_ID = produkti.NenKategoria_ID,
                NeShitje = produkti.NeShitje
            };

            await _context.Produkti.AddAsync(p);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ProduktiDTO>> GetAllProductsAsync()
        {
            var produktet = await _context.Produkti
               .OrderByDescending(p => p.CreatedAt)
               .Select(
                   p => new ProduktiDTO
                   {
                       Id = p.Produkti_ID,
                       Emri = p.EmriProdukti,
                       Kompania = p.Kompania.Kompania_Emri,
                       Kategoria = p.Kategoria.EmriKategorise,
                       Nenkategoria = p.NenKategoria.EmriNenkategorise,
                       Pershkrimi = p.PershkrimiProduktit,
                       Kompania_ID =  p.Kompania_ID,
                       Kategoria_ID = p.Kategoria_ID,
                       NenKategoria_ID = p.NenKategoria_ID,
                       Foto = p.FotoProduktit,
                       Cmimi = p.CmimiPerCope,
                       Stoku = p.SasiaNeStok,
                      NeShitje = p.NeShitje
                   }
               ).ToListAsync();
            return produktet;
        }


        // added:

        public async Task<Produkti?> GetByIdAsync(int id)
        {
            return await _context.Produkti.Include(p=>p.Kompania)
                .Include(p => p.Kategoria).
                Include(p=>p.NenKategoria).
                Include(p=>p.Zbritja).
                Include(p=>p.Review).
                FirstOrDefaultAsync(p => p.Produkti_ID == id);
        }

        public async Task<SidebarDataNeZbritje> GetSidebarDataNeZbritjeAsync()
        {
            var products = await _context.Produkti
                .Include(p => p.Kategoria)
                .Include(p => p.NenKategoria)
                .Where(p => p.Zbritja_ID != null && p.Zbritja.DataSkadimit >= DateTime.Now)
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
                    .ToList()
                    .DistinctBy(p=> new { p.SubcategoryId}).ToList()
                })
                .ToList();

            var maxPrice = products.Max(p => p.CmimiPerCope);


            var result = new SidebarDataNeZbritje
            {
                Categories = transformedCategories,
                MaxPrice = maxPrice
            };

            return result;
        }

        public async Task<ProductsResponseDTO> GetFilteredProducts(string sortBy, int pageNumber, int pageSize
         ,FilterNeZbritjeVM filters)
        {
            var selectedSubCategories = filters.SelectedSubCategories;
            decimal? minPrice = null;
            decimal? maxPrice = null;

            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            var productsQuery = _context.Produkti
                    .Where(p => p.NeShitje == true
                     && p.Zbritja_ID != null && p.Zbritja.DataSkadimit >= DateTime.Now
                                    && (string.IsNullOrEmpty(filters.SearchTerm) || p.EmriProdukti.Contains(filters.SearchTerm))
                                && (selectedSubCategories.Length == 0 || selectedSubCategories.Contains(p.NenKategoria.EmriNenkategorise))
                                && (
                                    !minPrice.HasValue || p.CmimiPerCope >= minPrice
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
                        CmimiMeZbritje = p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope,
                        Rating = p.Review.Any() ? (int)Math.Round(p.Review.Average(r => (double)r.Rating)) : null,
                    });

            productsQuery = sortBy.ToLower() switch
            {
                "asc" => productsQuery.OrderBy(p => p.CmimiMeZbritje),
                "desc" => productsQuery.OrderByDescending(p => p.CmimiMeZbritje),
                _ => throw new ArgumentException("Invalid sorting order. Use 'asc' or 'desc'.")
            };

            var pagedProducts = await productsQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();


            return new ProductsResponseDTO
            {
                PagedProducts = pagedProducts,
                TotalCount = productsQuery.Count(),
            };
        }

        public async Task<List<CartProductDTO>> GetProduktetSipasId(List<int> productIds)
        {
            var products = await _context.Produkti
                                        .Where(p => productIds.Contains(p.Produkti_ID) && p.NeShitje == true)
                                        .Select(p => new CartProductDTO
                                        {
                                            Id = p.Produkti_ID,
                                            Name = p.EmriProdukti,
                                            CmimiBaze = (decimal)(p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                                             ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                                             : p.CmimiPerCope),
                                            Image = p.FotoProduktit,
                                        })
                                        .ToListAsync();

            return products;
        }


        public async Task UpdateProductAsync(Produkti produktiPerTuEdituar,ProduktiVM produkti)
        {

                // nuk kom kontrollu emri , pershkrimi e kto a jane null pasi ky validim bohet ne front!
            produktiPerTuEdituar.EmriProdukti = produkti.Emri;
            produktiPerTuEdituar.PershkrimiProduktit = produkti.Pershkrimi;
            produktiPerTuEdituar.FotoProduktit = produkti.Foto;
            produktiPerTuEdituar.SasiaNeStok = produkti.Stoku;
            produktiPerTuEdituar.CmimiPerCope = produkti.Cmimi;
            produktiPerTuEdituar.Kompania_ID = produkti.Kompania_ID;
            produktiPerTuEdituar.Kategoria_ID = produkti.Kategoria_ID;
            produktiPerTuEdituar.NenKategoria_ID = produkti.NenKategoria_ID;
            produktiPerTuEdituar.NeShitje = produkti.NeShitje;

            _context.Produkti.Update(produktiPerTuEdituar);
            await _context.SaveChangesAsync();
        }

        public async Task<List<MeTeShituratDTO>> ShfaqMeTeShiturat()
        {

           var mostBoughtProductsIds = await _context.PorosiaItem
          .GroupBy(pi => pi.Produkti_ID)
          .Select(group => new
          {
              Produkti_ID = group.Key,
              TotalQuantity = group.Sum(pi => pi.SasiaPorositur)
          })
          .OrderByDescending(g => g.TotalQuantity)
          .Take(8)
          .ToListAsync();


            var productIds = mostBoughtProductsIds.Select(x => x.Produkti_ID).ToList();
            var products = await _context.Produkti
                .Where(p => productIds.Contains(p.Produkti_ID))
                .Select(p => new MeIShituriDTO
                {
                    Produkti_ID = p.Produkti_ID,
                    EmriProdukti = p.EmriProdukti,
                    FotoProduktit = p.FotoProduktit,
                    CmimiPerCope = (decimal)(p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                           ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                           : p.CmimiPerCope),
                })
                .ToListAsync();

            var results = products.Select(p => new MeTeShituratDTO
            {
                Product = p,
                TotalQuantity = mostBoughtProductsIds.FirstOrDefault(m => m.Produkti_ID == p.Produkti_ID)?.TotalQuantity
            }).ToList();

            return results;
        }

        public async Task DeleteProductAsync(Produkti produkti)
        {
            _context.Produkti.Remove(produkti);
            await _context.SaveChangesAsync();
        }

    }
}
