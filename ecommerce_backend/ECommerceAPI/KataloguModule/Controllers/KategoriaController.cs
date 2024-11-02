using ECommerce.Domain.KataloguModule.Entities;
using ECommerce.Infrastructure.Data;
using ECommerceAPI.DTOs;
using ECommerceAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceAPI.KataloguModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public KategoriaController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("shtoKategorine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] KategoriaVM kategoria)
        {
            var k = new Kategoria()
            {
                EmriKategorise = kategoria.Emri,
                Pershkrimi = kategoria.Pershkrimi
            };

            await _context.Kategoria.AddAsync(k);
            await _context.SaveChangesAsync();

            //  return Ok("Kategoria u shtua me sukses");
            return CreatedAtAction(nameof(Post), new { id = k.Kategoria_ID }, k);
        }


        [HttpGet]
        [Route("shfaqKategorite")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var kategorite = await _context.Kategoria
                .OrderByDescending(k => k.CreatedAt)
                .Select(k => new KategoriaDTO
                {
                    Id = k.Kategoria_ID,
                    Emri = k.EmriKategorise,
                    Pershkrimi = k.Pershkrimi
                })
                 .ToListAsync();

            return Ok(kategorite);
        }

        [HttpGet]
        [Route("shfaqKategoriteDheNenkategorite")]
        public async Task<IActionResult> ShfaqaKategoriteNenkategorite()
        {
            var teDhenat =
                await _context.Kategoria
                .Include(k => k.NenKategoria)
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

            return Ok(teDhenat);
        }

        [HttpGet]
        [Route("shaqKategorineSipasID/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var kategoria = await _context.Kategoria
             .Where(x => x.Kategoria_ID == id)
             .Select(k => new KategoriaDTO
             {
                 Id = k.Kategoria_ID,
                 Emri = k.EmriKategorise,
                 Pershkrimi = k.Pershkrimi
             })
            .FirstOrDefaultAsync();

            if (kategoria != null)
            {
                return Ok(kategoria);
            }

            return BadRequest("Kjo kategori nuk ekziston");
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerKategorine/{id}")]
        public async Task<IActionResult> GetSideBarData(int id)
        {
            var products = await _context.Produkti
             .Include(p => p.Kompania)
             .Where(p => p.Kategoria_ID == id)
             .ToListAsync();

            var companyNames = products
             .Select(p => p.Kompania.Kompania_Emri)
             .Distinct()
             .Select(name => new { name })
             .ToList();

            var maxPrice = products.Max(p => p.CmimiPerCope);

            var result = new
            {
                CompanyNames = companyNames,
                MaxPrice = maxPrice
            };

            return Ok(result);
        }

        [HttpPost]
        [Route("shfaqProduktetSipasKategorise/{id}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasKategorise(int id, string sortBy, int pageNumber, int pageSize, [FromBody] FiltersDTO filters)
        {
            var ekziston = await _context.Kategoria.FindAsync(id);
            if (ekziston == null)
            {
                return NotFound();
            }

            var selectedCompanies = filters.SelectedCompanies;
            decimal? minPrice = null;
            decimal? maxPrice = null;


            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            var totalProductsCount = await _context.Kategoria
                .Where(k => k.Kategoria_ID == id)
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
                 ))
                .CountAsync();

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

            return Ok(new
            {
                teDhenat,
                TotalCount = totalProductsCount
            });
        }



        [HttpPut]
        [Route("perditesoKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] KategoriaVM kategoria)
        {
            var kategoriaPerTuEdituar = await _context.Kategoria.FirstOrDefaultAsync(x => x.Kategoria_ID == id);

            if (kategoriaPerTuEdituar != null)
            {

                if (!kategoria.Emri.IsNullOrEmpty())
                {
                    kategoriaPerTuEdituar.EmriKategorise = kategoria.Emri;
                }

                if (!kategoria.Pershkrimi.IsNullOrEmpty())
                {
                    kategoriaPerTuEdituar.Pershkrimi = kategoria.Pershkrimi;
                }

                _context.Kategoria.Update(kategoriaPerTuEdituar);
                await _context.SaveChangesAsync();
                return Ok(kategoriaPerTuEdituar);
            }

            return BadRequest("Kjo Kategori nuk ekziston");
        }

        [HttpDelete]
        [Route("FshijKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var kategoria = await _context.Kategoria.FirstOrDefaultAsync(k => k.Kategoria_ID == id);
            if (kategoria != null)
            {
                _context.Kategoria.Remove(kategoria);
                await _context.SaveChangesAsync();
                return Ok("Kategoria u fshi me sukses!");
            }

            return BadRequest("Kjo kategori nuk ekziston");
        }
    }

    public class FiltersDTO
    {
        public string[] SelectedCompanies { get; set; }

        public decimal[] PriceRange { get; set; }

        public string SearchTerm { get; set; }
    }
}
