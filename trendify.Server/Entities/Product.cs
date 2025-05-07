namespace trendify.Server.Entities
{
    public class Product
    {
        public string Id { get; set; }
        public bool isOnSale { get; set; } = false;
        public bool isItNew { get; set; } = false;
        public bool isFeatured { get; set; } = false;
        public string Name { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string ShortDescription { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = null!;
    }
}
