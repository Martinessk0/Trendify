using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using trendify.Core.Contracts;
using trendify.Core.Models.Orders;
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
        public async Task<ActionResult<List<OrderSummaryModelModel>>> GetAll()
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
    }

}

