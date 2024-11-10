using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistItemsController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;

        public WishlistItemsController(IWishlistService wishlistService)
        {
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
            try
            {
                return Ok(await _wishlistService.GetWishlistItemsByUserIdAsnyc(userId));    
            }
            catch (NotFoundException)
            {
                return NotFound("Wishlist not found for the given user.");
            }

        }
    }
}
