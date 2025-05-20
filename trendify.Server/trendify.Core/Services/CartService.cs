using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Cart;
using trendify.Infractructure.Data.Common;
using trendify.Infractructure.Data.Entities;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Services
{
    public class CartService : ICartService
    {
        private readonly IRepository repo;
        public CartService(IRepository repo) => this.repo = repo;

        public async Task<ShoppingCartModel> GetCartByUserIdAsync(string userId)
        {
            var cart = await repo.All<ShoppingCart>()
                                 .Include(c => c.CartProducts)
                                 .FirstOrDefaultAsync(c => c.BuyerId == userId && c.IsActive);

            if (cart == null)
            {
                cart = new ShoppingCart(userId);
                await repo.AddAsync(cart);
                await repo.SaveChangesAsync();
            }

            return new ShoppingCartModel
            {
                BuyerId = cart.BuyerId,
                Items = cart.CartProducts
                            .Select(i => new CartItemModel
                            {
                                Id = i.Id,
                                ProductId = i.ProductId,
                                ProductName = i.ProductName,
                                ImageUrl = i.ImageUrl,
                                Price = i.Price,
                                Quantity = i.Quantity
                            })
                            .ToList()
            };
        }

        public async Task AddToCartAsync(string userId, int productId, int quantity)
        {
            // 1) Try to load the existing, active cart
            var cart = await repo.All<ShoppingCart>()
                                 .Include(c => c.CartProducts)
                                 .FirstOrDefaultAsync(c => c.BuyerId == userId && c.IsActive);

            // 2) If none exists, create AND immediately save it
            if (cart == null)
            {
                cart = new ShoppingCart(userId);
                await repo.AddAsync(cart);
                await repo.SaveChangesAsync();   // ← now EF has assigned cart.Id and is tracking it
            }

            // 3) Load the product
            var product = await repo.GetByIdAsync<Product>(productId)
                         ?? throw new ArgumentException("Product not found");

            // 4) Add your item
            cart.AddItem(product, quantity);

            // 5) Finally persist the new line-item
            await repo.SaveChangesAsync();
        }

        //public async Task AddToCartAsync(string userId, int productId, int quantity)
        //{
        //    // load or create cart
        //    var cart = await repo.All<ShoppingCart>()
        //                         .Include(c => c.CartProducts)
        //                         .FirstOrDefaultAsync(c => c.BuyerId == userId && c.IsActive)
        //               ?? new ShoppingCart(userId);

        //    if (cart.Id == 0)
        //        await repo.AddAsync(cart);

        //    // load product
        //    var product = await repo.GetByIdAsync<Product>(productId)
        //                 ?? throw new ArgumentException("Product not found");

        //    cart.AddItem(product, quantity);

        //    repo.Update(cart);
        //    await repo.SaveChangesAsync();
        //}

        public async Task UpdateCartItemAsync(string userId, int cartItemId, int quantity)
        {
            var item = await repo.GetByIdAsync<ShoppingCartItem>(cartItemId)
                       ?? throw new ArgumentException("Cart item not found");

            var cart = await repo.GetByIdAsync<ShoppingCart>(item.CartId)
                      ?? throw new ArgumentException("Cart not found");

            if (cart.BuyerId != userId)
                throw new UnauthorizedAccessException();

            item.SetQuantity(quantity);
            repo.Update(item);
            await repo.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(string userId, int cartItemId)
        {
            var item = await repo.GetByIdAsync<ShoppingCartItem>(cartItemId)
                       ?? throw new ArgumentException("Cart item not found");

            var cart = await repo.GetByIdAsync<ShoppingCart>(item.CartId)
                      ?? throw new ArgumentException("Cart not found");

            if (cart.BuyerId != userId)
                throw new UnauthorizedAccessException();

            repo.Delete(item);
            await repo.SaveChangesAsync();
        }

        public async Task ClearCartAsync(string userId)
        {
            var cart = await repo.All<ShoppingCart>()
                                 .Include(c => c.CartProducts)
                                 .FirstOrDefaultAsync(c => c.BuyerId == userId && c.IsActive);

            if (cart == null) return;

            foreach (var item in cart.CartProducts)
                repo.Delete(item);

            await repo.SaveChangesAsync();
        }
    }
}
