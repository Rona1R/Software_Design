using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IReviewService
    {

        Task PostReviewAsync(ReviewVM reviewVM);

        Task<List<ReviewsDashboardDTO>> GetAllReviewsAsync();

        Task<PaginatedReviewsDTO> GetReviewsByProductId(int produktiId, string sortOrder, int pageSize, int pageNumber);

        Task<ReviewEditDTO> GetSingleReviewAsync(int id);

        Task UpdateReviewAsync(int id, ReviewEditVM editedReview);

        Task DeleteReviewAsync(int id);
    }
}
