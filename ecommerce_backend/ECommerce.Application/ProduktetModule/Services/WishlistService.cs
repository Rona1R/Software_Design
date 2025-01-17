﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly IWishlistRepository _wishlistRepository;
        private readonly IProduktiRepository _produktiRepository;   

        public WishlistService(IWishlistRepository wishlistRepository,IProduktiRepository produktiRepository)
        {
            _wishlistRepository = wishlistRepository;
            _produktiRepository = produktiRepository;
        }   

        public async Task AddToWishlistAsync(WishlistItemVM wishlistItemVM)
        {
            //var productExists = await _produktiRepository.GetProduktiFromDbAsync(wishlistItemVM.Produkti_ID);
            var productExists = await _produktiRepository.GetByIdAsync(wishlistItemVM.Produkti_ID);

            if (productExists == null) {
                throw new NotFoundException();
            }

            var wishlistExists = await _wishlistRepository.GetWishlistByUserIdAsync(wishlistItemVM.IdKlienti);
            if(wishlistExists == null) // nese nuk ekziston wishliste --> krijoje
            {
                await _wishlistRepository.CreateWishlistAsync(wishlistItemVM.IdKlienti);
            }
            //retrieve wishlist again after creation:
            var userWishlist = await _wishlistRepository.GetWishlistByUserIdAsync(wishlistItemVM.IdKlienti);

            // add item to wishlist : 
            await _wishlistRepository.AddItemToWishlistAsync(userWishlist.WishlistId, wishlistItemVM.Produkti_ID);


        }

        public async Task RemoveWishlistItemAsync(int wishlistItemId)
        {
            var wishlistItem = await _wishlistRepository.GetWishlistItemByIdAsync(wishlistItemId);  

            if(wishlistItem == null)
            {
                throw new NotFoundException();
            }

            await _wishlistRepository.RemoveWishlistItemAsync(wishlistItem);
        }

        public async Task<WishlistItemResponse> IsInWishlistAsync(int productId,int userId)
        {
            return await _wishlistRepository.IsInWishlistAsync(productId, userId);
        }

        public async Task<WishlistByUserDTO> GetWishlistItemsByUserIdAsnyc(int  userId)
        {
            var wishlistExists = await _wishlistRepository.GetWishlistByUserIdAsync(userId);
            if(wishlistExists == null)
            {
                throw new NotFoundException();  
            }

            return _wishlistRepository.GetWishlistItems(wishlistExists);
        }
    }
}
