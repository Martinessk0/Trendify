using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Review;
using trendify.Infractructure.Data.Common;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IRepository repo;

        public ReviewService(IRepository repo) => this.repo = repo;

        public async Task<ReviewModel> AddReviewAsync(string? userId, CreateReviewDto dto)
        {
            var product = await repo.GetByIdAsync<Product>(dto.ProductId)
                          ?? throw new ArgumentException("Product not found");

            // Определяме какво ще е displayName
            string displayName;
            if (!string.IsNullOrWhiteSpace(userId))
            {
                var user = await repo.GetByIdAsync<User>(userId);
                displayName = user?.UserName ?? "Unknown";
            }
            else
            {
                if (string.IsNullOrWhiteSpace(dto.ReviewerName))
                    throw new ArgumentException("Anonymous review requires a name");
                displayName = dto.ReviewerName.Trim();
            }

            var review = new Review
            {
                ProductId = dto.ProductId,
                UserId = userId,
                ReviewerName = userId == null ? displayName : null,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            await repo.AddAsync(review);
            await repo.SaveChangesAsync();

            return new ReviewModel
            {
                Id = review.Id,
                Comment = review.Comment,
                DisplayName = displayName,
                CreatedAt = review.CreatedAt
            };
        }

        public async Task<List<ReviewModel>> GetByProductAsync(int productId)
        {
            return await repo.AllReadonly<Review>()
                .Where(r => r.ProductId == productId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new ReviewModel
                {
                    Id = r.Id,
                    Comment = r.Comment,
                    DisplayName = r.UserId != null
                        ? r.User!.UserName
                        : r.ReviewerName!,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();
        }
    }
}
