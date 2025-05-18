using trendify.Core.Models.Cart;

namespace trendify.Core.Contracts
{
    public interface ICartService
    {
        Task<ShoppingCartModel> GetCartByUserIdAsync(string userId);
        Task AddToCartAsync(string userId, int productId, int quantity);
        Task UpdateCartItemAsync(string userId, int cartItemId, int quantity);
        Task RemoveFromCartAsync(string userId, int cartItemId);
        Task ClearCartAsync(string userId);
    }
}
