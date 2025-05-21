using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using trendify.Core.Contracts;
using trendify.Core.Models.Cart;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // GET api/cart
        [HttpGet]
        public async Task<ActionResult<ShoppingCartModel>> GetCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var cart = await _cartService.GetCartByUserIdAsync(userId);
            return Ok(cart);
        }

        // POST api/cart
        [HttpPost]
        public async Task<ActionResult> AddItem([FromBody] AddCartItemDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _cartService.AddToCartAsync(userId, model.ProductId, model.Quantity);
            return Ok();
        }

        // PUT api/cart/{itemId}
        [HttpPut("{itemId}")]
        public async Task<ActionResult> UpdateItem(int itemId, [FromBody] UpdateCartItemDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _cartService.UpdateCartItemAsync(userId, itemId, model.Quantity);
            return NoContent();
        }

        // DELETE api/cart/{itemId}
        [HttpDelete("{itemId}")]
        public async Task<ActionResult> RemoveItem(int itemId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _cartService.RemoveFromCartAsync(userId, itemId);
            return NoContent();
        }

        // DELETE api/cart/clear
        [HttpDelete("clear")]
        public async Task<ActionResult> ClearCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            await _cartService.ClearCartAsync(userId);
            return NoContent();
        }

        [HttpGet("itemsCount")]
        public async Task<int> TotalItemsInCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var count = await _cartService.TotalItemsInCart(userId);
            return count;
        }
    }
}
