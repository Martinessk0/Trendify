namespace trendify.Core.Models.Products
{
    public class AllProductsModel
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

        public decimal Price { get; set; }

        public string Category { get; set; } = null!;

        public bool IsOnSale { get; set; } = false;

        public bool IsItNew { get; set; } = false;

        public bool IsFeatured { get; set; } = false;
    }
}
