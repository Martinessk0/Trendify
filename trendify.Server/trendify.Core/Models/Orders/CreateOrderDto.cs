namespace trendify.Core.Models.Orders
{
    public class CreateOrderDto
    {
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public int DeliveryAddressId { get; set; }
    }
}
