using trendify.Core.Models.Review;

namespace trendify.Core.Contracts
{
    public interface IReviewService
    {
        Task<ReviewModel> AddReviewAsync(string? userId, CreateReviewDto dto);
        Task<List<ReviewModel>> GetByProductAsync(int productId);
    }
}
