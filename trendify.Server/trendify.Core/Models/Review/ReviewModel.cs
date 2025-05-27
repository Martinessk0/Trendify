namespace trendify.Core.Models.Review
{
    public class ReviewModel
    {
        public int Id { get; set; }
        public string Comment { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}
