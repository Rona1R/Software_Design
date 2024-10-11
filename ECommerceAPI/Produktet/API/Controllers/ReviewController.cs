using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Data;
using ECommerceAPI.ViewModels;
using ECommerceAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using ECommerceAPI.Produktet.Domain.Entities;

namespace ECommerceAPI.Produktet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public ReviewController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("shtoReview")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] ReviewVM newReview)
        {
            var ekzistonUseri = await _context.User.FirstOrDefaultAsync(x => x.User_Id == newReview.User_Id);
            var ekzistonProdukti = await _context.Produkti.FirstOrDefaultAsync(x => x.Produkti_ID == newReview.Produkti_ID);

            // edhe ne Front Mos me ia lan perdoruesit te njejte me vendos review per produktin e njejt dy her qe mi ik SPAM komenteve
            var ekzistonReview = await _context.Review.FirstOrDefaultAsync(x => x.User_Id == newReview.User_Id & x.Produkti_ID == newReview.Produkti_ID);
            var kaBlereProduktin = await _context.Porosia
                .Where(p => p.UserId == newReview.User_Id) // filtro porosite e perdoruesit qe po don me lan Review 
                .AnyAsync(p=>p.PorosiaItem.Any(pi => pi.Produkti_ID == newReview.Produkti_ID));

            if (ekzistonUseri == null)
            {
                return BadRequest( new ErrorMessage{Message =  "Ky perdorues nuk u gjet ne sistem!" });
            }

            if (!kaBlereProduktin)
            {
                return BadRequest(new ErrorMessage { Message = "Ju nuk e keni blere kete produkt! Nuk mund te leni review" });
            }

            if (ekzistonProdukti == null)
            {
                return BadRequest(new ErrorMessage {Message =  "Ky produkt nuk u gjet ne sistem!" });
            }

            if (ekzistonReview != null)
            {
                return BadRequest(new ErrorMessage { Message = "Nuk mund te postoni review per produktin e njejte dy here!" });
            }

            var review = new Review() {
                Rating = newReview.Rating,
                ReviewContent = newReview.ReviewContent,
                User_Id = newReview.User_Id,
                Produkti_ID = newReview.Produkti_ID,
            };

            await _context.Review.AddAsync(review);
            await _context.SaveChangesAsync();
            return Ok("Review u shtua me sukses");
        }

        [HttpGet]
        [Route("shfaqReviews")] // shfaqja e te gjitha reviews per Dashboard te adminit
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
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
            return Ok(reviews);
        }

        //[HttpGet]
        //[Route("shfaqReviewsSipasProduktit/{produktiId}")] // shfaqja e reviews ne User Interface ( te Product Details)
        //public async Task<IActionResult> GetAllReviews(int produktiId)
        //{
        //    var reviews = await _context.Review
        //        .OrderByDescending(r => r.CreatedAt)
        //        .Where(r=>r.Produkti_ID == produktiId)
        //        .Select(
        //            r => new ReviewsDTO
        //            {
        //                Id = r.Review_ID,
        //                UserId = r.User_Id,
        //                Username = r.User.AspNetUser.UserName,
        //                Text = r.ReviewContent,
        //                Rating = r.Rating,
        //                DatedAdded = r.CreatedAt,
        //                AchievementBadge = r.User.AchievementBadge.Badge_Name,
        //                IsEdited = r.IsEdited,  
        //            }
        //        ).ToListAsync();    

        //    return Ok(reviews);

        //}

        [HttpGet]
        [Route("shfaqReviewsSipasProduktit/{produktiId}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<IActionResult> GetAllReviews(int produktiId,string sortOrder,int pageSize,int pageNumber)
        {
            var totalReviewsCount = await _context.Review
             .Where(r => r.Produkti_ID == produktiId)
             .CountAsync();

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
                    AchievementBadge = r.User.AchievementBadge.Badge_Name,
                    IsEdited = r.IsEdited,
                })
                .ToListAsync();

            return Ok( new { 
                reviews ,
                totalReviewsCount ,
            });
        }

        [HttpGet]
        [Route("shfaqReview/{id}")] 
        [Authorize]
        public async Task<IActionResult> Get(int id) // review Per mu bo edit nga Useri qe e ka shkru ate review
        {
            var review = await _context.Review
                .Where(r=>r.Review_ID == id)    
                .Select(r => new 
                {
                    Rating = r.Rating,
                    Komenti = r.ReviewContent,
   
                }).FirstOrDefaultAsync();
            return Ok(review);
        }

        [HttpPut]
        [Route("perditesoReview/{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] ReviewEditVM editedReview)// edhe pse userId edhe produkt id svyjn kur perditesohet prap pe perdori VM te njejte si Post ne Request Body
        {
            var review =await _context.Review.FirstOrDefaultAsync(x=>x.Review_ID==id);   
            if(review == null)
            {
                return BadRequest("Kjo review nuk u gjet ne sistem!");
            }

            // nese gjendet review le te perditesohet : 
            review.Rating = editedReview.Rating;    
            review.ReviewContent = editedReview.ReviewContent;
            review.IsEdited = true;

            _context.Review.Update(review);
            await _context.SaveChangesAsync();

            return Ok("Review u perditesua me sukses!");
        }

        [HttpDelete]
        [Route("fshijReview/{id}")] // per me fshi review (admini prej dashboardi), ose Useri Review-ne qe e ka lane
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var review = await _context.Review.FirstOrDefaultAsync(x => x.Review_ID == id);

            if(review == null)
            {
                return BadRequest("Kjo Review nuk u gjet ne sistem!");
            }

            _context.Review.Remove(review); 
            await _context.SaveChangesAsync();
            return Ok("Review u fshie me sukses!");
        }
    }
}
