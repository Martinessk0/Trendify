namespace trendify.Core.Models.Orders
{
    public class DeliveryAddressModel
    {
        public string Name { get; set; } = null!;
        public string StreetAddress { get; set; } = null!;
        public string City { get; set; } = null!;
        public string ZipCode { get; set; } = null!;
    }
}
