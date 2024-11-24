using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
           _reviewService = reviewService;  
        }

        [HttpPost]
        [Route("shtoReview")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] ReviewVM newReview)
        {
            try
            {
                await _reviewService.PostReviewAsync(newReview);    
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorMessage { Message = e.Message});   
            }

            return Ok("Review u shtua me sukses");
        }

        [HttpGet]
        [Route("shfaqReviews")] // shfaqja e te gjitha reviews per Dashboard te adminit
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _reviewService.GetAllReviewsAsync());    
        }

        [HttpGet]
        [Route("shfaqReviewsSipasProduktit/{produktiId}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<IActionResult> GetAllReviews(int produktiId, string sortOrder, int pageSize, int pageNumber)
        {
            return Ok(await _reviewService.GetReviewsByProductId(produktiId, sortOrder, pageSize, pageNumber)); 
        }

        [HttpGet]
        [Route("shfaqReview/{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id) // review Per mu bo edit nga Useri qe e ka shkru ate review
        {

            try
            {
                return Ok(await _reviewService.GetSingleReviewAsync(id));

            }catch(NotFoundException)
            {
                return NotFound();  
            }
        }

        [HttpPut]
        [Route("perditesoReview/{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] ReviewEditVM editedReview)// edhe pse userId edhe produkt id svyjn kur perditesohet prap pe perdori VM te njejte si Post ne Request Body
        {
            try
            {
                await _reviewService.UpdateReviewAsync(id,editedReview);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }

            return Ok("Review u perditesua me sukses !");    
        }

        [HttpDelete]
        [Route("fshijReview/{id}")] // per me fshi review (admini prej dashboardi), ose Useri Review-ne qe e ka lane
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _reviewService.DeleteReviewAsync(id);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }

            return Ok("Review u fshi  me sukses !");
        }
    }
}
