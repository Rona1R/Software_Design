using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class ProduktiService : IProduktiService
    {
        private readonly IProduktiRepository _productRepository;

        public ProduktiService(IProduktiRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task CreateProductAsync(ProduktiVM produkti)
        {
            await _productRepository.AddProductAsync(produkti);
        }

        public async Task<List<ProduktiDTO>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllProductsAsync();
        }

        public async Task<ProduktiDTO> GetProductByIdAsync(int id)
        {
            var ekziston = await _productRepository.GetProduktiFromDbAsync(id);
            if (ekziston == null)
            {
                throw new NotFoundException();

            }

            return await _productRepository.GetProductByIdAsync(id);
        }

        public async Task<SidebarDataNeZbritje> GetSidebarDataNeZbritjeAsync()
        {

            return await _productRepository.GetSidebarDataNeZbritjeAsync();
        }

        public async Task<ProductsResponseDTO> GetFilteredProducts(string sortBy, int pageNumber, int pageSize
       , FilterNeZbritjeVM filters)
        {
            return await _productRepository.GetFilteredProducts(sortBy, pageNumber, pageSize, filters);
        }

        public async Task<DetajetProduktitVM> GetProductDetailsByIdAsync(int id)
        {
            var ekziston = await _productRepository.GetProduktiFromDbAsync(id);
            if (ekziston == null)
            {
                throw new NotFoundException();

            }

            return await _productRepository.GetProductDetailsByIdAsync(id);
        }

        public async Task<List<CartProductDTO>> GetProduktetSipasId(List<int> productIds)
        {
            return await _productRepository.GetProduktetSipasId(productIds);   
        }

        public async Task UpdateProductAsync(int id,ProduktiVM produktiVM)
        {
            var ekziston = await _productRepository.GetProduktiFromDbAsync(id);
            if (ekziston == null)
            {
                throw new NotFoundException();

            }

            await _productRepository.UpdateProductAsync(ekziston, produktiVM);
        }

        public async Task<List<MeTeShituratDTO>> ShfaqMeTeShiturat()
        {
            return await _productRepository.ShfaqMeTeShiturat();
        }

        public async Task DeleteProductAsync(int id)
        {
            var ekziston = await _productRepository.GetProduktiFromDbAsync(id);
            if (ekziston == null)
            {
                throw new NotFoundException();

            }

            await _productRepository.DeleteProductAsync(ekziston);
        }

    }
}

