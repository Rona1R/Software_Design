using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Data;
using ECommerceAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using ECommerceAPI.Produktet.Domain.Entities;
using ECommerceAPI.Produktet.API.ViewModels;

namespace ECommerceAPI.Produktet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktiController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public ProduktiController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("shtoProduktin")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] ProduktiVM produkti)
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

            //  return Ok("Kategoria u shtua me sukses");
            return CreatedAtAction(nameof(Post), new { id = p.Produkti_ID }, p);
        }

        [HttpPost]
        [Route("shtoFoton")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> ShtoFoton(IFormFile foto)
        {
            if (foto == null || foto.Length == 0)
            {
                return BadRequest("Nuk keni vendosur foton!");
            }

            var folder = Path.Combine("..", "ecommerce-frontend", "public", "images", foto.FileName);

            using (var stream = new FileStream(folder, FileMode.Create))
            {
                await foto.CopyToAsync(stream);
            }

            return Ok(foto.FileName);
        }


        [HttpGet]   // endpoint per mi shfaq produktet ne dashboard
        [Route("shfaqProduktet")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
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
                        Kompania_ID = p.Kompania_ID,
                        Kategoria_ID = p.Kategoria_ID,
                        NenKategoria_ID = p.NenKategoria_ID,
                        Foto = p.FotoProduktit,
                        Cmimi = p.CmimiPerCope,
                        Stoku = p.SasiaNeStok,
                        NeShitje = p.NeShitje
                    }
                ).ToListAsync();
            return Ok(produktet);
        }



        [HttpGet] // produkti per mu editu
        [Route("shfaqProduktin/{id}")]
        public async Task<IActionResult> Get(int id)
        {

            var produkti = await _context.Produkti
                    .Where(p => p.Produkti_ID == id)
                    .Select(
                        p => new ProduktiDTO
                        {
                            Id = p.Produkti_ID,
                            Emri = p.EmriProdukti,
                            Foto = p.FotoProduktit,
                            Pershkrimi = p.PershkrimiProduktit,
                            Stoku = p.SasiaNeStok,
                            Cmimi = p.CmimiPerCope,
                            Kompania_ID = p.Kompania_ID,
                            Kompania = p.Kompania.Kompania_Emri,
                            Kategoria_ID = p.Kategoria_ID,
                            Kategoria = p.Kategoria.EmriKategorise,
                            NenKategoria_ID = p.NenKategoria_ID,
                            Nenkategoria = p.NenKategoria.EmriNenkategorise,
                            NeShitje = p.NeShitje
                        }
                    ).FirstOrDefaultAsync();

            if (produkti != null)
            {
                return Ok(produkti);
            }

            return BadRequest("Ky produkt nuk ekziston");
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerProduktetNeZbritje")]
        public async Task<IActionResult> GetSideBarData()
        {

            var products = await _context.Produkti
                .Include(p => p.Kategoria)
                .Include(p => p.NenKategoria)
                .Where(p => p.Zbritja_ID != null && p.Zbritja.DataSkadimit >= DateTime.Now)
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
        [Route("shfaqProduktetNeZbritje/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasNenKategorise(string sortBy, int pageNumber, int pageSize
         , [FromBody] FilterNeZbritjeVM filters
         )
        {
            var selectedSubCategories = filters.SelectedSubCategories;
            decimal? minPrice = null;
            decimal? maxPrice = null;

            if (filters.PriceRange != null && filters.PriceRange.Length == 2)
            {
                minPrice = filters.PriceRange[0];
                maxPrice = filters.PriceRange[1];
            }

            var totalProductsCount = await _context.Produkti
                .Where(p => p.NeShitje == true && p.Zbritja_ID != null && p.Zbritja.DataSkadimit >= DateTime.Now
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
                .CountAsync();


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


            return Ok(new
            {
                pagedProducts,
                TotalCount = totalProductsCount
            });
        }

        [HttpGet]
        [Route("shfaqDetajetProduktit/{id}")]
        public async Task<IActionResult> ShfaqDetajetProduktit(int id)
        {
            var ekziston = await _context.Produkti.FindAsync(id);
            if (ekziston == null)
            {
                return NotFound();
            }

            var produkti = await _context.Produkti
                .Where(p => p.Produkti_ID == id && p.NeShitje == true)
                .Select(p => new DetajetProduktitVM
                {
                    Id = p.Produkti_ID,
                    Name = p.EmriProdukti,
                    Description = p.PershkrimiProduktit,
                    Img = p.FotoProduktit,
                    Cost = p.CmimiPerCope,
                    // CmimiMeZbritje 
                    Category = p.Kategoria.EmriKategorise,
                    Subcategory = p.NenKategoria.EmriNenkategorise,
                    CategoryId = p.Kategoria_ID,
                    SubcategoryId = p.NenKategoria_ID,
                    Stock = p.SasiaNeStok,
                    CmimiMeZbritje = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                           ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                           : null,
                    Rating = p.Review.Any() ? (int)Math.Round(p.Review.Average(r => (double)r.Rating)) : null,
                    // Rating 

                }
                ).FirstOrDefaultAsync();

            if (produkti != null)
            {
                return Ok(produkti);
            }

            return BadRequest("Ky produkt nuk u gjet ne sistem!");

        }

        [HttpGet("productsByIds")]
        public async Task<IActionResult> GetProduktetSipasId([FromQuery] List<int> productIds)
        {

            var products = await _context.Produkti
                                          .Where(p => productIds.Contains(p.Produkti_ID) && p.NeShitje == true)
                                          .Select(p => new
                                          {
                                              id = p.Produkti_ID,
                                              name = p.EmriProdukti,
                                              cmimiBaze = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                                               ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                                               : p.CmimiPerCope,
                                              image = p.FotoProduktit,
                                          })
                                          .ToListAsync();
            //      var neShitje =  products.Where(p => p.neShitje == true).ToList();
            return Ok(products);
        }


        [HttpPut]
        [Route("perditesoProduktin/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] ProduktiVM produkti)
        {
            var produktiPerTuEdituar = await _context.Produkti.FirstOrDefaultAsync(p => p.Produkti_ID == id);

            if (produktiPerTuEdituar != null)
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
                return Ok(produktiPerTuEdituar);
            }

            return BadRequest("Ky produkt nuk eshte gjetur.");
        }

        [HttpGet]
        [Route("shfaq4MeTeShiturat")]
        public async Task<IActionResult> ShfaqMeTeShiturat()
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
                .Select(p => new
                {
                    p.Produkti_ID,
                    p.EmriProdukti,
                    p.FotoProduktit,
                    cmimiPerCope = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                           ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                           : p.CmimiPerCope,

                    //CmimiMeZbritje = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                    //       ? (p.CmimiPerCope - ((decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope))
                    //       : null,
                })
                .ToListAsync();

            var results = products.Select(p => new
            {
                Product = p,
                mostBoughtProductsIds.FirstOrDefault(m => m.Produkti_ID == p.Produkti_ID)?.TotalQuantity
            }).ToList();

            return Ok(results);
        }

        [HttpDelete]
        [Route("FshijProduktin/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var produkti = await _context.Produkti.FirstOrDefaultAsync(p => p.Produkti_ID == id);
            if (produkti != null)
            {
                _context.Produkti.Remove(produkti);
                await _context.SaveChangesAsync();
                return Ok("Produkti u fshi me sukses!");
            }

            return BadRequest("Ky produkt nuk ekziston");
        }

    }

}
