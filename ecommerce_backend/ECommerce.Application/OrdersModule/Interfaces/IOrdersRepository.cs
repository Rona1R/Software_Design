using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.OrdersModule.DTOs;
using ECommerce.Application.OrdersModule.ViewModels;
using ECommerce.Domain.OrdersModule.Entities;


namespace ECommerce.Application.OrdersModule.Interfaces
{
    public interface IOrdersRepository
    {
        Task<int> CreateOrderAsync(PorosiaVM porosia);

        Task<Porosia?> GetPorosiaFromDbAsync(int id);

        Task<ReceiptDetails> GetReceiptAsnyc(int orderId);

        Task<List<OrderDTO>> GetAllOrdersAsync();

        Task<List<UserOrderDTO>> GetOrdersByUserIdAsync(int userId);

        Task UpdateOrderStatusAsync(Porosia porosia, string statusi);
    }
}
