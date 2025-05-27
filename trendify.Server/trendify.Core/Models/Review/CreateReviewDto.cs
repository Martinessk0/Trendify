namespace trendify.Core.Models.Review
{
    public class CreateReviewDto
    {
        public int ProductId { get; set; }
        public string Comment { get; set; } = null!;
        public string? ReviewerName { get; set; }
    }
}
