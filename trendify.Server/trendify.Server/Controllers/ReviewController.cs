using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using trendify.Core.Contracts;
using trendify.Core.Models.Review;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : Controller
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
            => _reviewService = reviewService;

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetForProduct(int productId)
        {
            var reviews = await _reviewService.GetByProductAsync(productId);
            return Ok(reviews);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateReviewDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var review = await _reviewService.AddReviewAsync(userId, dto);
            return CreatedAtAction(nameof(GetForProduct),
                new { productId = dto.ProductId }, review);
        }
    }
}
