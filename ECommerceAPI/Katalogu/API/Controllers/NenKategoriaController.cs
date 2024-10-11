using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Data;
using ECommerceAPI.ViewModels;
using ECommerceAPI.DTOs;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using ECommerceAPI.Katalogu.Domain.Entities;

namespace ECommerceAPI.Katalogu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NenKategoriaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public NenKategoriaController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("shtoNenKategorine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] NenKategoriaVM nenkategoria)
        {
            var kategoriaEkziston = await _context.Kategoria.FirstOrDefaultAsync(k => k.Kategoria_ID == nenkategoria.KategoriaID);

            if (kategoriaEkziston == null)
            {
                return NotFound();
            }
            var nk = new NenKategoria()
            {
                EmriNenkategorise = nenkategoria.Emri,
                Kategoria_ID = nenkategoria.KategoriaID
            };

            await _context.NenKategoria.AddAsync(nk);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Post), new { id = nk.NenKategoria_ID }, nk);
        }

        [HttpGet]
        [Route("shfaqNenKategorite")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var nenkategorite = await _context.NenKategoria
                //  .Include(nk=>nk.Kategoria)
                .OrderByDescending(nk => nk.CreatedAt)
                .Select(nk => new NenKategoriaDTO
                {
                    Id = nk.NenKategoria_ID,
                    Emri = nk.EmriNenkategorise,
                    Kategoria = nk.Kategoria.EmriKategorise,
                    KategoriaID = nk.Kategoria.Kategoria_ID
                })
                 .ToListAsync();

            return Ok(nenkategorite);
        }

        [HttpGet]
        [Route("shfaqNenKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var nenkategoria = await _context.NenKategoria
                 .Where(nk => nk.NenKategoria_ID == id)
                 //   .Include(nk=>nk.Kategoria)
                 .Select(nk => new NenKategoriaDTO()
                 {
                     Id = nk.NenKategoria_ID,
                     Emri = nk.EmriNenkategorise,
                     Kategoria = nk.Kategoria.EmriKategorise,
                     KategoriaID = nk.Kategoria.Kategoria_ID
                 })
                 .FirstOrDefaultAsync();
            if (nenkategoria == null)
            {
                return BadRequest("NenKategoria nuk u gjet!");
            }

            return Ok(nenkategoria);
        }

        [HttpGet]
        [Route("shfaqNenkategoriseSipasKategorise/{id}")]
        public async Task<IActionResult> GeSipasKategorise(int id)
        {
            var nenkategorite = await _context
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

            return Ok(nenkategorite);
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerNenkategorine/{id}")]
        public async Task<IActionResult> GetSideBarData(int id)
        {
            var products = await _context.Produkti
             .Include(p => p.Kompania)
             .Where(p => p.NenKategoria_ID == id)
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
        [Route("shfaqProduktetSipasNenKategorise/{id}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasNenKategorise(int id, string sortBy, int pageNumber, int pageSize,
            [FromBody] FiltersNenkategoriaDTO filters
         )
        {
            var ekziston = await _context.NenKategoria.FindAsync(id);
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

            var subcategory = await _context.NenKategoria
           .Where(nk => nk.NenKategoria_ID == id)
           .Select(nk => new
           {
               SubcategoryName = nk.EmriNenkategorise,
               CategoryName = nk.Kategoria.EmriKategorise
           })
           .FirstOrDefaultAsync();

            if (subcategory == null)
            {
                return BadRequest("Nenkategoria nuk u gjet ne sistem");
            }

            var teDhenat = new NenkategoriaMeProduktetDTO
            {
                SubcategoryId = id,
                SubCategoryName = subcategory.SubcategoryName,
                Category = subcategory.CategoryName,
                Products = pagedProducts
            };

            return Ok(new
            {
                teDhenat,
                TotalCount = totalProductsCount
            });
        }


        [HttpPut]
        [Route("perditesoNenKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] NenKategoriaVM nenkategoria)
        {
            var nenKategoriaPerTuEdituar = await _context.NenKategoria.Include(nk => nk.Produkti).FirstOrDefaultAsync(x => x.NenKategoria_ID == id);
            var kategoriaERe = await _context.Kategoria.FirstOrDefaultAsync(x => x.Kategoria_ID == nenkategoria.KategoriaID);

            if (nenKategoriaPerTuEdituar != null)
            {

                if (!nenkategoria.Emri.IsNullOrEmpty())
                {
                    nenKategoriaPerTuEdituar.EmriNenkategorise = nenkategoria.Emri;
                }
                else
                {
                    return BadRequest("Emri  i nenkategorise sduhet te jete i zbrazet!");
                }

                if (kategoriaERe != null)
                {
                    if (nenKategoriaPerTuEdituar.Kategoria_ID != nenkategoria.KategoriaID)
                    {
                        foreach (var produkt in nenKategoriaPerTuEdituar.Produkti)
                        {
                            produkt.Kategoria_ID = nenkategoria.KategoriaID;
                            //   _context.Produkti.Update(produkt);
                            //   await _context.SaveChangesAsync();
                        }
                        nenKategoriaPerTuEdituar.Kategoria_ID = nenkategoria.KategoriaID;
                    }
                    // nese eshte ndryshuar ID e kategorise nga e vjetra , barte ndryshimin te produktet:

                    // nese eshte ndryshuar ID e kategorise nga e vjetra , barte ndryshimin te produktet:
                    //if (nenKategoriaPerTuEdituar.Kategoria_ID != nenkategoria.KategoriaID)
                    //{
                    //}
                }
                else
                {

                    return BadRequest("Kategoria e specifik nuk ekziston");
                }

                _context.NenKategoria.Update(nenKategoriaPerTuEdituar);
                await _context.SaveChangesAsync();
                return Ok(nenKategoriaPerTuEdituar);
            }

            return BadRequest("Kjo NenKategori nuk ekziston!");
        }


        [HttpDelete]
        [Route("FshijNenKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var nenkategoria = await _context.NenKategoria.Include(nk => nk.Produkti).FirstOrDefaultAsync(nk => nk.NenKategoria_ID == id);
            if (nenkategoria != null)
            {
                // fshiji produktet qe e referecojn ate nenkategori:
                foreach (var product in nenkategoria.Produkti)
                {
                    _context.Produkti.Remove(product);
                }

                _context.NenKategoria.Remove(nenkategoria);
                await _context.SaveChangesAsync();
                return Ok("Nenkategoria u fshi me sukses!");
            }

            return BadRequest("Kjo nenkategori nuk ekziston");
        }


    }

    public class FiltersNenkategoriaDTO
    {
        public string[] SelectedCompanies { get; set; }

        public decimal[] PriceRange { get; set; }

        public string SearchTerm { get; set; }
    }
}
