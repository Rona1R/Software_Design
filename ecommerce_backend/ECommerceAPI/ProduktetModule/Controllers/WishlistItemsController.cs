using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Infrastructure.Data;
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
        private readonly IWishlistService _wishlistService;

        public WishlistItemsController(ECommerceDBContext context,IWishlistService wishlistService)
        {
            _context = context;
            _wishlistService = wishlistService;
        }

        [HttpPost]
        [Route("Add-Wishlist-and-Products")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] WishlistItemVM wishlistItemVM)
        {
            try
            {
                await _wishlistService.AddToWishlistAsync(wishlistItemVM);
                return Ok("Product was added to Wishlist!");
            }
            catch (NotFoundException)
            {
                return NotFound();
            }

        }

        [HttpDelete]
        [Route("Remove-Wishlist-Products/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteWishlistItem(int id)
        {

            try
            {
                await _wishlistService.RemoveWishlistItemAsync(id);

            }catch(NotFoundException)
            {

                return NotFound();  
            }

            return Ok("Produkti u largua nga wishlist me sukses!");
        }

        [HttpGet]
        [Route("NdodhetNeWishlist/{produktiId}/{userId}")]
        [Authorize]
        public async Task<IActionResult> NdodhetNeWishlist(int produktiId, int userId)
        {
            return Ok(await _wishlistService.IsInWishlistAsync(produktiId, userId));    

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
