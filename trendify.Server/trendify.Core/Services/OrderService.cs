using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Orders;
using trendify.Infractructure.Data.Common;
using trendify.Infractructure.Data.Entities;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository repo;
        public OrderService(IRepository repo) => this.repo = repo;

        public async Task<List<OrderSummaryModel>> GetOrdersForUserAsync(string userId)
        {
            var orders = await repo.AllReadonly<Order>()
                                   .Where(o => o.BuyerId == userId)
                                   .Include(o => o.OrderStatus)
                                   .ToListAsync();

            return orders
               .Select(o => new OrderSummaryModel
               {
                   Id = o.Id,
                   OrderNumber = o.OrderNumber,
                   OrderDate = o.OrderDate,
                   Total = o.TotalOrderPrice(),
                   Status = o.OrderStatus.Name
               })
               .ToList();
        }

        public async Task<OrderDetailsModel?> GetOrderDetailsAsync(string userId, int orderId)
        {
            var o = await repo.AllReadonly<Order>()
                              .Where(x => x.BuyerId == userId && x.Id == orderId)
                              .Include(x => x.OrderStatus)
                              .Include(x => x.DeliveryAddress)
                              .Include(x => x.Products)
                              .FirstOrDefaultAsync();

            if (o == null) return null;

            return new OrderDetailsModel
            {
                Id = o.Id,
                OrderNumber = o.OrderNumber,
                OrderDate = o.OrderDate,
                FullName = o.FullName,
                Email = o.Email,
                PhoneNumber = o.PhoneNumber,
                Status = o.OrderStatus.Name,
                DeliveryAddress = new DeliveryAddressModel
                {
                    Name = o.DeliveryAddress.Name,
                    StreetAddress = o.DeliveryAddress.StreetAddress,
                    City = o.DeliveryAddress.City,
                    ZipCode = o.DeliveryAddress.ZipCode
                },
                Items = o.Products
                         .Select(i => new OrderItemModel
                         {
                             ProductId = i.ProductId,
                             ProductName = i.ProductName,
                             ImageUrl = i.ImageUrl,
                             Price = i.Price,
                             Quantity = i.Quantity
                         })
                         .ToList(),
                Total = o.TotalOrderPrice()
            };
        }

        public async Task<OrderDetailsModel> CreateOrderAsync(string userId, CreateOrderDto model)
        {
            // load cart
            var cart = await repo.All<ShoppingCart>()
                                 .Include(c => c.CartProducts)
                                 .FirstOrDefaultAsync(c => c.BuyerId == userId && c.IsActive);

            if (cart == null || !cart.CartProducts.Any())
                throw new InvalidOperationException("Cart is empty.");

            // build order
            var order = new Order(userId)
            {
                OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}".Substring(0, 20),
                Email = model.Email,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                DeliveryAddressId = model.DeliveryAddressId
            };

            // map cart items into order
            foreach (var item in cart.CartProducts)
            {
                var oi = new ShoppingCartItem(
                    item.ProductId,
                    item.ProductName,
                    item.Price,
                    item.ImageUrl,
                    item.Quantity
                );
                order.Products.Add(oi);
            }

            await repo.AddAsync(order);

            // clear the cart
            foreach (var item in cart.CartProducts)
                repo.Delete(item);

            await repo.SaveChangesAsync();

            // return the newly created order details
            return await GetOrderDetailsAsync(userId, order.Id)
                   ?? throw new Exception("Failed to retrieve created order.");
        }

        public async Task<bool> UpdateOrderStatusAsync(int orderId, int newStatusId)
        {
            var order = await repo.GetByIdAsync<Order>(orderId);
            if (order == null) return false;

            order.OrderStatusId = newStatusId;
            repo.Update(order);
            await repo.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CancelOrderAsync(string userId, int orderId)
        {
            var order = await repo.All<Order>()
                                  .FirstOrDefaultAsync(o => o.Id == orderId && o.BuyerId == userId);

            if (order == null) return false;

            repo.Delete(order);
            await repo.SaveChangesAsync();
            return true;
        }
    }
}
