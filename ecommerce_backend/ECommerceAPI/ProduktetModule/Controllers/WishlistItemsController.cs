using ECommerce.Domain.ProduktetModule.Entities;
using ECommerceAPI.Data;
using ECommerceAPI.ProduktetModule.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistItemsController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public WishlistItemsController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("Add-Wishlist-and-Products")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] WishlistItemVM wishlistItemVM)
        {

            if (wishlistItemVM == null || wishlistItemVM.IdKlienti == null || wishlistItemVM.Produkti_ID == null)
            {
                return BadRequest("Invalid input.");
            }

            var produkti = await _context.Produkti.FindAsync(wishlistItemVM.Produkti_ID);

            if (produkti == null)
            {
                return NotFound("Product not found.");
            }

            // me kqyr a ka te krijume wishlist perdoruesi
            var ekzistonWishlist = await _context.Wishlist.FirstOrDefaultAsync(w => w.IdKlienti == wishlistItemVM.IdKlienti);
            if (ekzistonWishlist == null) // nuk ka Wishlist, krijon
            {
                var wishlista = new Wishlist()
                {
                    IdKlienti = wishlistItemVM.IdKlienti,
                };

                await _context.Wishlist.AddAsync(wishlista);
                await _context.SaveChangesAsync();
            }


            var userWishlist = await _context.Wishlist.FirstOrDefaultAsync(w => w.IdKlienti == wishlistItemVM.IdKlienti);
            var wishlistItem = new WishlistItem
            {
                WishlistId = userWishlist.WishlistId,
                Produkti_ID = produkti.Produkti_ID,

            };

            await _context.WishlistItem.AddAsync(wishlistItem);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error saving changes to the database.");
            }

            return CreatedAtAction(nameof(Post), new { id = wishlistItem.WishlistItemId }, wishlistItem);
        }
        /*

        [HttpDelete]
        [Route("Remove-Wishlist-Products/{id}")]

        public async Task<IActionResult> DeleteWishlistItem(int id)
        {
            
            var wishlistItem = await _context.WishlistItem.FindAsync(id);

            if (wishlistItem == null)
            {
                return NotFound(); 
            }

            
            _context.WishlistItem.Remove(wishlistItem);

         
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Internal server error occurred while deleting the item.");
            }

           
            return NoContent();
        }*/
        [HttpDelete]
        [Route("Remove-Wishlist-Products/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteWishlistItem(int id)
        {

            var wishlistItem = await _context.WishlistItem.FindAsync(id);
            if (wishlistItem == null)
            {
                return NotFound();
            }
            _context.WishlistItem.Remove(wishlistItem);

            await _context.SaveChangesAsync();

            return Ok("Produkti u largua nga wishlist me sukses!");
        }

        [HttpGet]
        [Route("NdodhetNeWishlist/{produktiId}/{userId}")]
        [Authorize]
        public async Task<IActionResult> NdodhetNeWishlist(int produktiId, int userId)
        {

            var ndodhetNeWishliste = await _context.WishlistItem
             .Where(w => w.Produkti_ID == produktiId && w.Wishlist.IdKlienti == userId)
             .Select(w => new
             {
                 ItemId = w.WishlistItemId
             }).FirstOrDefaultAsync();
            if (ndodhetNeWishliste == null)
            {
                return Ok(new { exists = false });
            }
            else
            {
                return Ok(new { exists = true, ndodhetNeWishliste });
            }

        }

        [HttpGet]
        [Route("Get-Wishlist-by-UserId/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetWishlistByUserId(int userId)
        {
            var wishlist = await _context.Wishlist
                .Include(w => w.WishlistItem)
                .ThenInclude(wi => wi.Produkti)
                   .ThenInclude(p => p.Zbritja)
                .FirstOrDefaultAsync(w => w.IdKlienti == userId);

            if (wishlist == null)
            {
                return NotFound("Wishlist not found for the given user.");
            }

            var wishlistVM = new WishlistVM
            {
                IdKlienti = wishlist.IdKlienti
            };

            var productVMs = wishlist.WishlistItem.Select(wi => new ProductWishlistVM
            {
                WishlistItemId = wi.WishlistItemId,
                Produkti_ID = wi.Produkti_ID,
                EmriProdukti = wi.Produkti.EmriProdukti,
                PershkrimiProduktit = wi.Produkti.PershkrimiProduktit,
                CmimiPerCope = wi.Produkti.Zbritja != null && wi.Produkti.Zbritja.DataSkadimit >= DateTime.Now
                           ? wi.Produkti.CmimiPerCope - (decimal)wi.Produkti.Zbritja.PerqindjaZbritjes / 100 * wi.Produkti.CmimiPerCope
                           : wi.Produkti.CmimiPerCope,
                FotoProduktit = wi.Produkti.FotoProduktit

            }).ToList();

            return Ok(new { Wishlist = wishlistVM, Produkti = productVMs });
        }
    }
}
