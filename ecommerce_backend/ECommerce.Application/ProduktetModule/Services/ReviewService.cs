using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Application.UsersModule.Interfaces;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class ReviewService : IReviewService
    {

        private readonly IReviewRepository _reviewRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProduktiRepository _produktiRepository;

        public ReviewService(IReviewRepository reviewRepository, IUserRepository userRepository, IProduktiRepository produktiRepository)
        {
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
            _produktiRepository = produktiRepository;
        }


        public async Task PostReviewAsync(ReviewVM reviewVM)
        {
            // Validimet para se te lejohet postimi i review ne sistem per produktin perkates
            var ekzistonUseri = await _userRepository.GetUserByIdAsync(reviewVM.User_Id);
            if (ekzistonUseri == null)
            {
                throw new NotFoundException("Ky perdorues nuk u gjet ne sistem!");
            }

            var ekistonProdukti = await _produktiRepository.GetByIdAsync(reviewVM.Produkti_ID);
            if (ekistonProdukti == null)
            {
                throw new NotFoundException("Ky produkt nuk u gjet ne sistem!");
            }

            var hasPurchased = await _reviewRepository.HasPurchasedItem(reviewVM.User_Id, reviewVM.Produkti_ID);
            if (!hasPurchased)
            {
                throw new Exception("Ju nuk e keni blere kete produkt! Nuk mund te leni review");
            }

            var reviewExists = await _reviewRepository.UserHasLeftReview(reviewVM.User_Id, reviewVM.Produkti_ID);
            if (reviewExists)
            {
                throw new Exception("Nuk mund te postoni review per produktin e njejte dy here!");
            }

            // validuar me sukses -- > postoje review
            await _reviewRepository.PostReviewAsync(reviewVM);
        }

        public async Task<List<ReviewsDashboardDTO>> GetAllReviewsAsync()
        {
            return await _reviewRepository.GetAllReviewsAsync();
        }
        public async Task<PaginatedReviewsDTO> GetReviewsByProductId(int produktiId, string sortOrder, int pageSize, int pageNumber)
        {
            return await _reviewRepository.GetReviewsByProductId(produktiId, sortOrder, pageSize, pageNumber);

        }

        public async Task<ReviewEditDTO> GetSingleReviewAsync(int id)
        {
         //   return await _reviewRepository.GetSingleReviewAsync(id);
           var r = await _reviewRepository.GetReviewFromDbAsync(id);
            if(r == null)
            {
                throw new NotFoundException();
            }

            return new ReviewEditDTO
            {
                Rating = r.Rating,
                Komenti = r.ReviewContent,
            };
        }

        public async Task UpdateReviewAsync(int id,ReviewEditVM editedReview)
        {
            var reviewExists = await _reviewRepository.GetReviewFromDbAsync(id);
            if(reviewExists == null)
            {
                throw new NotFoundException("Kjo Review nuk u gjet ne sistem!");
            }
    
            await _reviewRepository.UpdateReviewAsync(reviewExists, editedReview);
        }

        public async Task DeleteReviewAsync(int id)
        {
            var reviewExists = await _reviewRepository.GetReviewFromDbAsync(id);
            if (reviewExists == null)
            {
                throw new NotFoundException("Kjo Review nuk u gjet ne sistem!");
            }

            await _reviewRepository.DeleteReviewAsnyc(reviewExists);
        }
    }
}

