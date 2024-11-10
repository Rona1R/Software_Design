using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IWishlistRepository
    {

        Task<Wishlist?> GetWishlistByUserIdAsync(int userId);

        Task CreateWishlistAsync(int userId);

        Task AddItemToWishlistAsync(int wishlistId, int productId);

        Task<WishlistItem?> GetWishlistItemByIdAsync(int wishlistItemId);

        Task RemoveWishlistItemAsync(WishlistItem wishlistItem);

        Task<WishlistItemResponse> IsInWishlistAsync(int productId, int userId);

        WishlistByUserDTO GetWishlistItems(Wishlist wishlist);
    }
}
