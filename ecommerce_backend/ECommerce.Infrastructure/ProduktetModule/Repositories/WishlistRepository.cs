using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
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
            return await _context.Wishlist
                .Include(w => w.WishlistItem)
                .ThenInclude(wi => wi.Produkti)
                   .ThenInclude(p => p.Zbritja)
                .FirstOrDefaultAsync(w => w.IdKlienti == userId);
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

        public async Task RemoveWishlistItemAsync(WishlistItem wishlistItem)
        {
            _context.WishlistItem.Remove(wishlistItem);

            await _context.SaveChangesAsync();
        }

        public async Task<WishlistItem?> GetWishlistItemByIdAsync(int wishlistItemId)
        {
            return await _context.WishlistItem.FindAsync(wishlistItemId);
        }

        public async Task<WishlistItemResponse> IsInWishlistAsync(int productId,int userId)
        {
            var ndodhetNeWishliste = await _context.WishlistItem
               .Where(w => w.Produkti_ID == productId && w.Wishlist.IdKlienti == userId)
               .Select(w => new WishlistItemDTO
               {
                   ItemId = w.WishlistItemId
               }).FirstOrDefaultAsync();
            if (ndodhetNeWishliste == null)
            {
                return new WishlistItemResponse { Exists = false };
            }
            else
            {
                return new WishlistItemResponse { Exists = true, NdodhetNeWishliste = ndodhetNeWishliste };
            }
        }

        public WishlistByUserDTO GetWishlistItems(Wishlist wishlist)
        {
            var productVMs = wishlist.WishlistItem.Select(wi => new ProductWishlistVM
            {
                WishlistItemId = wi.WishlistItemId,
                Produkti_ID = wi.Produkti_ID,
                EmriProdukti = wi.Produkti.EmriProdukti,
                PershkrimiProduktit = wi.Produkti.PershkrimiProduktit,
                NeShitje = wi.Produkti.NeShitje,
                CmimiPerCope = wi.Produkti.Zbritja != null && wi.Produkti.Zbritja.DataSkadimit >= DateTime.Now
                       ? wi.Produkti.CmimiPerCope - (decimal)wi.Produkti.Zbritja.PerqindjaZbritjes / 100 * wi.Produkti.CmimiPerCope
                       : wi.Produkti.CmimiPerCope,
                FotoProduktit = wi.Produkti.FotoProduktit

            }).ToList();

           return new WishlistByUserDTO { Produkti = productVMs };
        }
    }
}
