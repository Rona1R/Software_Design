using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.ProduktetModule.Repositories
{
    public class WishlistRepository : IWishlistRepository
    {

        private readonly ECommerceDBContext _context;
       

        public WishlistRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task<Wishlist?> GetWishlistByUserIdAsync(int userId)
        {
            return await _context.Wishlist.FirstOrDefaultAsync(w => w.IdKlienti == userId);
        }

        public async Task CreateWishlistAsync(int userId)
        {
            var wishlista = new Wishlist()
            {
                IdKlienti = userId,
            };

            await _context.Wishlist.AddAsync(wishlista);
            await _context.SaveChangesAsync();
        }

        public async Task AddItemToWishlistAsync(int wishlistId,int productId)
        {
            var wishlistItem = new WishlistItem
            {
                WishlistId = wishlistId,
                Produkti_ID = productId,

            };

            await _context.WishlistItem.AddAsync(wishlistItem);
            await _context.SaveChangesAsync();
        }
    }
}
