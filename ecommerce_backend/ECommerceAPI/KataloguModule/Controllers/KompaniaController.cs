using ECommerce.Domain.KataloguModule.Entities;
using ECommerceAPI.Data;
using ECommerceAPI.DTOs;
using ECommerceAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceAPI.KataloguModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KompaniaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public KompaniaController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]//Add
        [Route("shtoKompanine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] KompaniaVM kompania)
        {
            var k = new Kompania()
            {
                Kompania_Emri = kompania.Emri,
            };

            await _context.Kompania.AddAsync(k);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Post), new { id = k.Kompania_ID }, k);


        }

        [HttpGet]//show
        [Route("shfaqKompanine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var kompanite = await _context.Kompania
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => new KompaniaDTO
                {
                    Id = k.Kompania_ID,
                    Emri = k.Kompania_Emri

                })
                 .ToListAsync();

            return Ok(kompanite);
        }

        [HttpGet]
        [Route("shfaqKompaniteKategorite")]
        public async Task<IActionResult> ShfaqKompaniteKategorite()
        {
            var teDhenatPerNav = await _context.Kompania
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => new CompanyDTO
                {
                    Id = k.Kompania_ID,
                    Name = k.Kompania_Emri,

                    CompanyCategories = k.Produkti.Select(p => new CompanyCategoryDTO
                    {
                        CategoryId = p.Kategoria_ID,
                        CategoryName = p.Kategoria.EmriKategorise
                    }
                    ).GroupBy(c => c.CategoryId)
                     .Select(g => g.First()).ToList()
                }).ToListAsync();

            return Ok(teDhenatPerNav);
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerKompanine/{id}")]
        public async Task<IActionResult> GetSideBarData(int id)
        {

            var products = await _context.Produkti
                .Include(p => p.Kategoria)
                .Include(p => p.NenKategoria)
                .Where(p => p.Kompania_ID == id)
                .ToListAsync();

            var transformedCategories = products
                .GroupBy(p => new { p.Kategoria.Kategoria_ID, p.Kategoria.EmriKategorise })
                .Select(g => new
                {
                    categoryId = g.Key.Kategoria_ID,
                    categoryName = g.Key.EmriKategorise,
                    subCategory = g.Select(p => new
                    {
                        subcategoryId = p.NenKategoria.NenKategoria_ID,
                        subCategoryName = p.NenKategoria.EmriNenkategorise
                    })
                    .Distinct()
                    .ToList()
                })
                .ToList();

            var maxPrice = products.Max(p => p.CmimiPerCope);

            var result = new
            {
                Categories = transformedCategories,
                MaxPrice = maxPrice
            };

            return Ok(result);
        }



        [HttpPost]
        [Route("shfaqProduktetSipasKompanise/{id}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasNenKategorise(int id, string sortBy, int pageNumber, int pageSize
        , [FromBody] FiltersKompaniaDTO filters
        )
        {
            var ekziston = await _context.Kompania.FindAsync(id);
            if (ekziston == null)
            {
                return NotFound();
            }


            var selectedSubCategories = filters.SelectedSubCategories;
            decimal? minPrice = null;
            decimal? maxPrice = null;

            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            var totalProductsCount = await _context.Kompania
                .Where(k => k.Kompania_ID == id)
                .SelectMany(k => k.Produkti.Where(p => p.NeShitje == true
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
                ))
                .CountAsync();

            var productsQuery = _context.Kompania
                .Where(k => k.Kompania_ID == id)
                .SelectMany(k => k.Produkti
                    .Where(p => p.NeShitje == true
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

            var kompania = await _context.Kompania
           .Where(nk => nk.Kompania_ID == id)
           .Select(nk => new
           {
               Name = nk.Kompania_Emri
           })
           .FirstOrDefaultAsync();

            if (kompania == null)
            {
                return BadRequest("Kjo kompani nuk u gjet");
            }

            var teDhenat = new KompaniaMeProduktetDTO
            {
                Id = id,
                Name = kompania.Name,
                Products = pagedProducts
            };

            return Ok(new
            {
                teDhenat,
                TotalCount = totalProductsCount
            });
        }

        [HttpGet]
        [Route("getSidebarDataPerKompanineKategorine/{companyId}/{categoryId}")]
        public async Task<IActionResult> GetSidebarData(int companyId, int categoryId)
        {
            var products = await _context.Produkti
                .Include(p => p.NenKategoria)
                .Where(p => p.Kompania_ID == companyId && p.Kategoria_ID == categoryId)
                .ToListAsync();

            var maxPrice = products.Max(p => p.CmimiPerCope);

            var uniqueSubcategories = products
                .Select(p => new
                {
                    SubcategoryId = p.NenKategoria.NenKategoria_ID,
                    SubCategoryName = p.NenKategoria.EmriNenkategorise
                })
                .Distinct()
                .ToList();

            var result = new
            {
                MaxPrice = maxPrice,
                Subcategories = uniqueSubcategories
            };

            return Ok(result);
        }


        [HttpPost]
        [Route("shfaqProduktetSipasKompaniseDheKategorise/{companyId}/{categoryId}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasKompaniseDheKategorise(int companyId, int categoryId, string sortBy, int pageNumber, int pageSize
         , [FromBody] FiltersKompaniaDTO filters
         )
        {
            var ekzistonKompania = await _context.Kompania.FindAsync(companyId);
            var ekzistonKategoria = await _context.Kategoria.FindAsync(categoryId);

            if (ekzistonKategoria == null || ekzistonKompania == null)
            {
                return NotFound();
            }

            var selectedSubCategories = filters.SelectedSubCategories;
            decimal? minPrice = null;
            decimal? maxPrice = null;

            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            var totalProductsCount = await _context.Kompania
            .Where(k => k.Kompania_ID == companyId)
            .SelectMany(k => k.Produkti
                .Where(p => p.NeShitje == true && p.Kategoria_ID == categoryId
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
                ))
            .CountAsync();

            var productsQuery = _context.Kompania
                .Where(k => k.Kompania_ID == companyId)
                .SelectMany(k => k.Produkti
                    .Where(p => p.NeShitje == true && p.Kategoria_ID == categoryId
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

            var kompania = await _context.Kompania
           .Where(nk => nk.Kompania_ID == companyId)
           .Select(nk => new
           {
               Name = nk.Kompania_Emri
           })
           .FirstOrDefaultAsync();

            var kategoria = await _context.Kategoria
            .Where(k => k.Kategoria_ID == categoryId)
            .Select(k => new
            {
                Name = k.EmriKategorise
            }).FirstOrDefaultAsync();

            if (kompania == null || kategoria == null)
            {
                return BadRequest("kategoria ose kompania nuk u gjet!");
            }

            var teDhenat = new KompaniaKategoriaMeProduktetDTO
            {
                Id = companyId,
                Name = kompania.Name,
                CategoryId = categoryId,
                CategoryName = kategoria.Name,
                Products = pagedProducts
            };

            return Ok(new
            {
                teDhenat,
                TotalCount = totalProductsCount
            });
        }


        [HttpGet]
        [Route("shfaqKompaninesipasID/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var kompania = await _context.Kompania.Where(x => x.Kompania_ID == id).Select(k => new KompaniaDTO
            {
                Id = k.Kompania_ID,
                Emri = k.Kompania_Emri

            }
            ).FirstOrDefaultAsync();

            if (kompania != null)
            {
                return Ok(kompania);
            }

            return BadRequest("Kjo kompani nuk ekziston");
        }


        [HttpPut]
        [Route("perditesoKompanine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]

        public async Task<IActionResult> Put(int id, [FromBody] KompaniaVM kompania)
        {
            var UpdatedCompany = await _context.Kompania.FirstOrDefaultAsync(x => x.Kompania_ID == id);

            if (UpdatedCompany != null)
            {

                if (!kompania.Emri.IsNullOrEmpty())
                {
                    UpdatedCompany.Kompania_Emri = kompania.Emri;
                }

                if (!kompania.Emri.IsNullOrEmpty())
                {
                    UpdatedCompany.Kompania_Emri = kompania.Emri;
                }

                _context.Kompania.Update(UpdatedCompany);
                await _context.SaveChangesAsync();
                return Ok(UpdatedCompany);
            }

            return BadRequest("Kjo kompani nuk ekziston");
        }


        [HttpDelete]
        [Route("FshijKompanine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var kompania = await _context.Kompania.FirstOrDefaultAsync(k => k.Kompania_ID == id);
            if (kompania != null)
            {
                _context.Kompania.Remove(kompania);
                await _context.SaveChangesAsync();
                return Ok("Kompanie eshte fshire me sukses!");
            }

            return BadRequest("Kjo kompani nuk ekziston");
        }




    }
    public class FiltersKompaniaDTO
    {
        public string[] SelectedSubCategories { get; set; }

        public decimal[] PriceRange { get; set; }

        public string SearchTerm { get; set; }
    }

}
