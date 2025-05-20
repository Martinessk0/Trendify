// Core/Models/Orders/CreateOrderDto.cs
using trendify.Core.Models.Cart;

namespace trendify.Core.Models.Orders
{
    public class CreateOrderDto
    {
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public DeliveryAddressDto Address { get; set; } = null!;
    }

    public class DeliveryAddressDto
    {
        public string StreetAddress { get; set; } = null!;
        public string ZipCode { get; set; } = null!;
        public string City { get; set; } = null!;
        public string? Name { get; set; }
    }
}

// Core/Models/Orders/OrderSummaryModel.cs
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

// Core/Models/Orders/OrderDetailsModel.cs
namespace trendify.Core.Models.Orders
{
    public class OrderDetailsModel : OrderSummaryModel
    {
        public List<CartItemModel> Items { get; set; } = new();
        public DeliveryAddressDto Address { get; set; } = null!;
    }
}
