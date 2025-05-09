using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using trendify.Server.Data.Common;
using trendify.Server.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly IRepository repo;

        public CartController(IRepository repo)
        {
            this.repo = repo;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpGet]
        public async Task<ActionResult<List<CartItem>>> GetCart()
        {
            var userId = GetUserId();

            var cartItems = await repo.AllReadonly<CartItem>()
                .Where(c => c.UserId == userId)
                .Include(c => c.Product) 
                .ToListAsync();

            return Ok(cartItems);
        }


        public class AddToCartDto
        {
            public string ProductId { get; set; } = null!;
            public int Quantity { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
        {
            var userId = GetUserId();
            var existing = repo.All<CartItem>()
                .FirstOrDefault(x => x.UserId == userId && x.ProductId == dto.ProductId);

            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
                await repo.SaveChangesAsync();
            }
            else
            {
                var item = new CartItem
                {
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity,
                    UserId = userId
                };

                await repo.AddAsync(item);
                await repo.SaveChangesAsync();
            }

            return Ok();
        }


        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveFromCart(string productId)
        {
            var userId = GetUserId();
            var item = repo.All<CartItem>()
                .FirstOrDefault(c => c.UserId == userId && c.ProductId == productId);

            if (item == null) return NotFound();

            await repo.DeleteAsync<CartItem>(item.Id);
            await repo.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();
            var items = repo.All<CartItem>()
                .Where(c => c.UserId == userId).ToList();

            foreach (var item in items)
            {
                await repo.DeleteAsync<CartItem>(item.Id);
            }

            await repo.SaveChangesAsync();
            return Ok();
        }
    }
}
