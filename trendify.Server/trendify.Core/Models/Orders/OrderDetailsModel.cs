namespace trendify.Core.Models.Orders
{
    public class OrderDetailsModel
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = null!;
        public DateTimeOffset OrderDate { get; set; }

        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public string Status { get; set; } = null!;
        public DeliveryAddressModel DeliveryAddress { get; set; } = null!;

        public List<OrderItemModel> Items { get; set; } = new List<OrderItemModel>();
        public decimal Total { get; set; }
    }
}
