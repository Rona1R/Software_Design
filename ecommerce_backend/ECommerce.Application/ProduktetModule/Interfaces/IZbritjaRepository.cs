using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IZbritjaRepository
    {
        // Task PostReviewAsync(ReviewVM newReview);

        Task AddZbritjaAsync(ZbritjaVM newZbritja);

        Task<List<ZbritjaDTO>> GetAllZbritjetAsync();
    }


}
