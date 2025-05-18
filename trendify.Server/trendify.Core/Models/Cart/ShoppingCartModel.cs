namespace trendify.Core.Models.Cart
{
    public class ShoppingCartModel
    {
        public string BuyerId { get; set; } = null!;
        public List<CartItemModel> Items { get; set; } = new List<CartItemModel>();
    }
}
