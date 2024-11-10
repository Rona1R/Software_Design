using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IWishlistService
    {
        Task AddToWishlistAsync(WishlistItemVM wishlistItemVM);

        Task RemoveWishlistItemAsync(int wishlistItemId);

        Task<WishlistItemResponse> IsInWishlistAsync(int productId, int userId);
    }
}
