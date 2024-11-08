using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.OrdersModule.DTOs;
using ECommerce.Application.OrdersModule.ViewModels;

namespace ECommerce.Application.OrdersModule.Interfaces
{
    public interface IOrdersService
    {

        Task<ValidateCartResponse> ValidateCart(List<CartItemDTO> cartItems);

        Task<int> CreateOrderAsync(PorosiaVM porosiaVM);

        Task<ReceiptDetails> GetReceiptAsync(int orderId);

        Task<List<OrderDTO>> GetAllOrdersAsync();

        Task<List<UserOrderDTO>> GetOrdersByUserIdAsync(int orderId);

        Task UpdateOrderStatusAsync(int orderId, string statusi);
    }
}
