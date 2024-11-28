using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.BusinessModule.Entities;

namespace ECommerce.Application.BusinessModule.Interfaces
{
    public interface IHomeVideoService
    {
        Task<HomeVideos> GetByIdAsync(int id);
        Task<List<HomeVideos>> GetAllAsync();

        Task CreateAsync(string filename);

        Task DeleteAsync(HomeVideos video);
    }
}
