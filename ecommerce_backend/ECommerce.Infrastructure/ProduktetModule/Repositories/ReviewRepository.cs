using System.ComponentModel;
using System.Diagnostics;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.ProduktetModule.Repositories
{
    public class ReviewRepository:IReviewRepository
    {
        private readonly ECommerceDBContext _context;


        public ReviewRepository(ECommerceDBContext context)
        {
            _context = context; 
        }


        public async Task PostReviewAsync(ReviewVM newReview)
        {
            var review = new Review()
            {
                Rating = newReview.Rating,
                ReviewContent = newReview.ReviewContent,
                User_Id = newReview.User_Id,
                Produkti_ID = newReview.Produkti_ID,
            };

            await _context.Review.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ReviewsDashboardDTO>> GetAllReviewsAsync()
        {
            var reviews = await _context.Review
               .OrderByDescending(r => r.CreatedAt)
               .Select(r => new ReviewsDashboardDTO
               {
                   ReviewID = r.Review_ID,
                   Rating = r.Rating,
                   Komenti = r.ReviewContent,
                   KlientiID = r.User.User_Id,
                   KlientiUsername = r.User.AspNetUser.UserName,
                   KlientiEmail = r.User.AspNetUser.Email,
                   ProduktiID = r.Produkti_ID,
                   ProduktiEmri = r.Produkti.EmriProdukti

               }).ToListAsync();

            return reviews;
        }

        public async Task<PaginatedReviewsDTO> GetReviewsByProductId(int produktiId, string sortOrder, int pageSize, int pageNumber)
        {
       
            var reviewsQuery = _context.Review.Where(r => r.Produkti_ID == produktiId);


            // Apply sorting
            switch (sortOrder)
            {
                case "Oldest":
                    reviewsQuery = reviewsQuery.OrderBy(r => r.CreatedAt);
                    break;
                case "Most Recent":
                    reviewsQuery = reviewsQuery.OrderByDescending(r => r.CreatedAt);
                    break;
                case "Highest Rating":
                    reviewsQuery = reviewsQuery.OrderByDescending(r => r.Rating);
                    break;
                case "Lowest Rating":
                    reviewsQuery = reviewsQuery.OrderBy(r => r.Rating);
                    break;
                default:
                    reviewsQuery = reviewsQuery.OrderByDescending(r => r.CreatedAt);
                    break;
            }

            var reviews = await reviewsQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(r => new ReviewsDTO
                {
                    Id = r.Review_ID,
                    UserId = r.User_Id,
                    Username = r.User.AspNetUser.UserName,
                    Text = r.ReviewContent,
                    Rating = r.Rating,
                    DateAdded = r.CreatedAt,
                    AchievementBadge = r.User.AchievementBadge!=null? r.User.AchievementBadge.Badge_Name??"Unprovided":"Unknown",
                    IsEdited = r.IsEdited,
                })
                .ToListAsync();

            return new PaginatedReviewsDTO()
            {
                Reviews = reviews,
                TotalReviewsCount = reviewsQuery.Count(),
            };
        }

 
        public async Task<Review?> GetReviewFromDbAsync(int id)
        {
            return await _context.Review.FirstOrDefaultAsync(x => x.Review_ID == id);
        }

        public async Task UpdateReviewAsync(Review review,ReviewEditVM editedReview)
        {
            review.Rating = editedReview.Rating;
            review.ReviewContent = editedReview.ReviewContent;
            review.IsEdited = true;

            _context.Review.Update(review);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReviewAsnyc(Review review)
        {
            _context.Review.Remove(review);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> HasPurchasedItem(int useriId,int produktiId)
        {
            return await _context.Porosia
                .Where(p => p.UserId == useriId) // filtro porosite e perdoruesit qe po don me lan Review 
                .AnyAsync(p => p.PorosiaItem.Any(pi => pi.Produkti_ID == produktiId));
        }

        // metoda per me kontrollu nese ka lene kete review me heret !!
        public async Task<bool> UserHasLeftReview(int userId,int productId)
        {
            return await  _context.Review.FirstOrDefaultAsync(x => x.User_Id == userId & x.Produkti_ID == productId) != null;
        }

    }
}
