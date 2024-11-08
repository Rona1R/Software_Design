using ECommerce.Application.Exceptions;
using ECommerce.Application.OrdersModule.DTOs;
using ECommerce.Application.OrdersModule.Interfaces;
using ECommerce.Application.OrdersModule.ViewModels;
using ECommerce.Application.ProduktetModule.Interfaces;

namespace ECommerce.Application.OrdersModule.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly IProduktiRepository _produktiRepository;
        private readonly IOrdersRepository _ordersRepository;
      
        public OrdersService(IProduktiRepository produktiRepository,IOrdersRepository ordersRepository) { 
            
            _produktiRepository = produktiRepository;   
            _ordersRepository = ordersRepository;   
        }  

        public async Task<ValidateCartResponse> ValidateCart( List<CartItemDTO> cartItems)
        {
            var errors = new List<string>();

            foreach (var item in cartItems)
            {

                var ekziston = await _produktiRepository.GetProduktiFromDbAsync(item.Id);

                if (ekziston == null)
                {

                    errors.Add($"Product {item.Name} with code {item.Id} does not exist.Please remove it from cart");
                }
                else if (ekziston.SasiaNeStok == 0)
                {
                    errors.Add($"Product {item.Name} with code {item.Id} is currently out of Stock.Please remove it from cart");
                }
                else if (ekziston.SasiaNeStok < item.Sasia)
                {
                    errors.Add($"Available Stock for Product {item.Name} with code {item.Id} is {ekziston.SasiaNeStok}.Please lower the quantity!");
                }
            }

            if(errors.Count == 0) {
                return new ValidateCartResponse { IsValid = true };
            }
            else
            {
                return new ValidateCartResponse { IsValid = false,Errors = errors };
            }
        }
        public async Task<int> CreateOrderAsync(PorosiaVM porosia)
        {
            var order = await _ordersRepository.CreateOrderAsync(porosia);
            return order;
        }

        public async Task<ReceiptDetails> GetReceiptAsync(int orderId)
        {
            var exists  = await _ordersRepository.GetPorosiaFromDbAsync(orderId);   
            if(exists == null)
            {
                throw new NotFoundException();
            }

            return await _ordersRepository.GetReceiptAsnyc(orderId);
        }

        public async Task<List<OrderDTO>> GetAllOrdersAsync()
        {
            return await _ordersRepository.GetAllOrdersAsync();
        }

        public async Task<List<UserOrderDTO>> GetOrdersByUserIdAsync(int orderId)
        {
            return await _ordersRepository.GetOrdersByUserIdAsync(orderId);
        }

        public async Task UpdateOrderStatusAsync(int orderId,string statusi)
        {
            var exists = await _ordersRepository.GetPorosiaFromDbAsync(orderId);
            if (exists == null)
            {
                throw new NotFoundException();
            }

            await _ordersRepository.UpdateOrderStatusAsync(exists,statusi);
        }
    }
}
