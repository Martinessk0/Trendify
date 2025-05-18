namespace trendify.Core.Models.Orders
{
    public class OrderSummaryModel
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = null!;
        public DateTimeOffset OrderDate { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; } = null!;
    }
}
