using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using trendify.Server.Data.Common;
using trendify.Server.Data.Entities;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IRepository repo;

        public OrderController(IRepository repo)
        {
            this.repo = repo;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        public class CreateOrderDto
        {
            public string CustomerName { get; set; } = null!;
            public string CustomerAddress { get; set; } = null!;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] CreateOrderDto dto)
        {
            var userId = GetUserId();
            var cartItems = repo.All<CartItem>().Where(c => c.UserId == userId).ToList();

            if (!cartItems.Any())
                return BadRequest("Cart is empty.");

            var order = new Order
            {
                UserId = userId,
                CustomerName = dto.CustomerName,
                CustomerAddress = dto.CustomerAddress,
                OrderedAt = DateTime.UtcNow,
                Items = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    Quantity = c.Quantity
                }).ToList()
            };

            await repo.AddAsync(order);

            // Премахни всички елементи от количката
            foreach (var item in cartItems)
            {
                await repo.DeleteAsync<CartItem>(item.Id);
            }

            await repo.SaveChangesAsync();
            return Ok(new { OrderId = order.Id });
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetUserOrders()
        {
            var userId = GetUserId();
            var orders = repo.AllReadonly<Order>()
                .Where(o => o.UserId == userId)
                .ToList();

            return Ok(orders);
        }
    }
}
