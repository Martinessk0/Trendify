using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using trendify.Core.Contracts;
using trendify.Core.Models.Orders;

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

        // GET api/order
        // (e.g. for an admin or to list current user's orders)
        [HttpGet]
        public async Task<ActionResult<List<OrderSummaryModel>>> GetOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var orders = await _orderService.GetOrdersForUserAsync(userId);
            return Ok(orders);
        }

        // GET api/order/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsModel>> GetOrder(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var order = await _orderService.GetOrderDetailsAsync(userId, id);
            if (order == null)
                return NotFound();
            return Ok(order);
        }

        // POST api/order
        [HttpPost]
        public async Task<ActionResult<OrderDetailsModel>> CreateOrder([FromBody] CreateOrderDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var created = await _orderService.CreateOrderAsync(userId, model);
            // return 201 with location header
            return CreatedAtAction(nameof(GetOrder), new { id = created.Id }, created);
        }

        // PUT api/order/{id}/status
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateStatus(int id, [FromBody] UpdateOrderStatusDto model)
        {
            var success = await _orderService.UpdateOrderStatusAsync(id, model.NewStatusId);
            if (!success) return NotFound();
            return NoContent();
        }

        // DELETE api/order/{id}
        // (cancel an order)
        [HttpDelete("{id}")]
        public async Task<ActionResult> CancelOrder(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var success = await _orderService.CancelOrderAsync(userId, id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
