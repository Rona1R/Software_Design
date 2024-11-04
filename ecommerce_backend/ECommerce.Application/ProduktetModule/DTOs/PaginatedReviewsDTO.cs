using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class PaginatedReviewsDTO
    {

        public List<ReviewsDTO> Reviews { get; set;}

        public int TotalReviewsCount { get; set;}   
    }
}
