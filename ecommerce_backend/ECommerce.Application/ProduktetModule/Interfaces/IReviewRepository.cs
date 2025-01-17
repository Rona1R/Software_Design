﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IReviewRepository
    {
        Task PostReviewAsync(ReviewVM newReview);

        Task<List<ReviewsDashboardDTO>> GetAllReviewsAsync();

        Task<PaginatedReviewsDTO> GetReviewsByProductId(int produktiId, string sortOrder, int pageSize, int pageNumber);


        Task UpdateReviewAsync(Review review, ReviewEditVM editedReview);

        Task<Review?> GetReviewFromDbAsync(int id);

        Task DeleteReviewAsnyc(Review review);

        Task<bool> HasPurchasedItem(int useriId, int produktiId);

        Task<bool> UserHasLeftReview(int userId, int productId);
    }
}
