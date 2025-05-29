using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using trendify.Core.Contracts;
using trendify.Core.Models.Orders;
using trendify.Core.Services;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // POST api/order
        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateOrderModel dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var orderId = await _orderService.CreateOrderAsync(userId, dto);
            return CreatedAtAction(nameof(GetById), new { id = orderId }, orderId);
        }

        // GET api/order
        [HttpGet]
        public async Task<ActionResult<List<OrderSummaryModel>>> GetAll()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            return Ok(await _orderService.GetOrdersByUserAsync(userId));
        }

        // GET api/order/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsModel>> GetById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            return Ok(await _orderService.GetOrderByIdAsync(userId, id));
        }

        // Server/Controllers/OrderController.cs
        [HttpGet("recent")]
        public async Task<ActionResult<List<OrderSummaryModel>>> GetRecent([FromQuery] int count = 10)
        {
            var recent = await _orderService.GetRecentOrdersByUserAsync(count);
            return Ok(recent);
        }

        [HttpGet("revenue")]
        public async Task<decimal> Revenue()
        {
            return await _orderService.TotalRevenue();
        }


        [HttpGet("totalCount")]
        public async Task<int> TotalCount()
        {
            return await _orderService.TotalOrders();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(
          int id,
          [FromBody] UpdateOrderStatusModel dto)
        {
            await _orderService.UpdateOrderStatusAsync(id, dto.NewStatusId);
            return NoContent();
        }
    }

}

