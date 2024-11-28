using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.Exceptions;
using ECommerce.Domain.BusinessModule.Entities;

namespace ECommerce.Application.BusinessModule.Services
{
    public class HomeVideoService : IHomeVideoService
    {

        private readonly IHomeVideoRepository _homeVideoRepository;

        public HomeVideoService(IHomeVideoRepository homeVideoRepository)
        {
            _homeVideoRepository = homeVideoRepository;
        }

        public async Task CreateAsync(string filename)
        {
           await _homeVideoRepository.CreateAsync(filename);
        }

        public async Task<HomeVideos> GetByIdAsync(int id)
        {
            var homeVideo = await _homeVideoRepository.GetByIdAsync(id);

            if (homeVideo == null)
            {

                throw new NotFoundException();
            }

            return homeVideo;   

        }

        public async Task DeleteAsync(HomeVideos video)
        {
            await _homeVideoRepository.DeleteAsync(video);
        }

        public async Task<List<HomeVideos>> GetAllAsync()
        {
            return await _homeVideoRepository.GetAllAsync();
        }
    }
}
