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

        Task<List<Zbritja>> GetAllZbritjetAsync();

        Task<Zbritja?> GetZbritjaByIdAsync(int id);

        Task UpdateZbritjaAsync(Zbritja zbritja,ZbritjaVM zbritjaVM);

       // Task<bool> ZbritjaExists(int id, string name);

       
    }


}
