using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Application.OrdersModule.DTOs;
using ECommerce.Application.OrdersModule.Interfaces;
using ECommerce.Application.OrdersModule.ViewModels;
using ECommerce.Application.Exceptions;

namespace ECommerceAPI.OrdersModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PorosiaController : ControllerBase
    {
      
        private readonly IOrdersService _ordersService;

        public PorosiaController(IOrdersService ordersService)
        {
            _ordersService = ordersService;
        }


        [HttpPost("validateCart")]
        public async Task<IActionResult> ValidateCart([FromBody] List<CartItemDTO> cartItems)
        {
            var response =  await _ordersService.ValidateCart(cartItems);   
            if(!response.IsValid)
            {
                return BadRequest(response);    
            }

            return Ok(response);    
        }

        [HttpPost("shtoPorosine")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] PorosiaVM porosia)
        {
            try
            {
                var orderId = await _ordersService.CreateOrderAsync(porosia);
                return Ok(orderId);
            }catch (OrdersException ex) { 
                return BadRequest(ex.Message);
            }catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
   
        }


        [HttpGet("shfaqFaturenPorosise/{porosiaId}")]
        [Authorize]
        public async Task<IActionResult> ShfaqFaturen(int porosiaId)
        {
            try
            {
                return Ok(await _ordersService.GetReceiptAsync(porosiaId)); 
            }
            catch (NotFoundException)
            {
                return NotFound("Kjo porosi nuk ekziston ne sistem");
            }
        }


        [HttpGet("shfaqPorosite")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> ShfaqPorosite()
        {
            var porosite = await
                _ordersService.GetAllOrdersAsync();

            return Ok(porosite);
        }

        [HttpGet("shfaqPorositeSipasPerdoruesit/{userId}")]
        [Authorize]
        public async Task<IActionResult> Get(int userId)
        {
            var porosite = await
               _ordersService.GetOrdersByUserIdAsync(userId);

            return Ok(porosite);
        }


        [HttpPut("perditesoStatusin/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, string statusi)
        {

            try
            {
                await _ordersService.UpdateOrderStatusAsync(id, statusi);   
                return Ok("Statusi i porosise eshte perditesuar me sukses!");
            }catch (NotFoundException) {
                return NotFound();
             }
        }

    }
}
