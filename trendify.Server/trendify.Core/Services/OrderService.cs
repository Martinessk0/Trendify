using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Cart;
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

        public async Task<int> CreateOrderAsync(string userId, CreateOrderModel dto)
        {
            var cart = await repo.All<ShoppingCart>()
                     .Include(c => c.CartProducts)
                     .FirstOrDefaultAsync(c => c.BuyerId == userId && c.IsActive)
           ?? throw new InvalidOperationException("No active cart.");
            //var cart = await repo.GetByIdAsync<ShoppingCart>(userId);

            if (!cart.CartProducts.Any())
                throw new InvalidOperationException("Cart is empty.");

            var address = new DeliveryAddress(
                dto.Address.StreetAddress,
                dto.Address.ZipCode,
                dto.Address.City,
                dto.Address.Name);
            await repo.AddAsync(address);
            await repo.SaveChangesAsync();

            var order = new Order(userId)
            {
                Email = dto.Email,
                FullName = dto.FullName,
                PhoneNumber = dto.PhoneNumber,
                Products = cart.CartProducts,
                DeliveryAddressId = address.Id,
                OrderStatusId = 1,
                OrderNumber = Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),

            };

            //order.Price = order.TotalOrderPrice();

            await repo.AddAsync(order);

            cart.IsActive = false;
            repo.Update(cart);

            await repo.SaveChangesAsync();

            var link = new UserOrder
            {
                UserId = userId,
                OrderId = order.Id
            };
            await repo.AddAsync(link);


            await repo.SaveChangesAsync();
            return order.Id;
        }

        public async Task<OrderDetailsModel> GetOrderByIdAsync(string userId, int orderId)
        {
            var o = await repo.AllReadonly<Order>()
                       .Where(x => x.BuyerId == userId && x.Id == orderId)
                       .Include(x => x.OrderStatus)
                       .Include(x => x.DeliveryAddress)
                       .Include(x => x.Products)
                       .FirstOrDefaultAsync()
                   ?? throw new KeyNotFoundException("Order not found");

            return new OrderDetailsModel
            {
                Id = o.Id,
                OrderNumber = o.OrderNumber,
                OrderDate = o.OrderDate,
                Total = o.TotalOrderPrice(),
                Status = o.OrderStatus.Name,
                Address = new DeliveryAddressModel
                {
                    StreetAddress = o.DeliveryAddress.StreetAddress,
                    ZipCode = o.DeliveryAddress.ZipCode,
                    City = o.DeliveryAddress.City,
                    Name = o.DeliveryAddress.Name
                },
                Items = o.Products.Select(i => new CartItemModel
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    ImageUrl = i.ImageUrl,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };
        }

        public async Task<List<OrderSummaryModel>> GetOrdersByUserAsync(string userId)
        {
            var orders = await repo.AllReadonly<Order>()
                      .Where(o => o.BuyerId == userId)
                      .Include(o => o.OrderStatus)
                      .Include(o => o.Products)        
                      .ToListAsync();

            return orders.Select(o => new OrderSummaryModel
            {
                Id = o.Id,
                OrderNumber = o.OrderNumber,
                OrderDate = o.OrderDate,
                Status = o.OrderStatus.Name,
                Total = o.TotalOrderPrice()
            }).ToList();
        }

        // Core/Services/OrderService.cs
        public async Task<List<OrderSummaryModel>> GetRecentOrdersByUserAsync(int count)
        {
            var orders = await repo.AllReadonly<Order>()
                .Include(o => o.OrderStatus)
                .Include(o => o.Products)
                .OrderByDescending(o => o.OrderDate)
                .Take(count)
                .ToListAsync();

            return orders.Select(o => new OrderSummaryModel
            {
                Id = o.Id,
                OrderNumber = o.OrderNumber,
                OrderDate = o.OrderDate,
                Status = o.OrderStatus.Name,
                Total = o.TotalOrderPrice()
            }).ToList();
        }

        public async Task<decimal> TotalRevenue()
        {
            var orders = await repo.AllReadonly<Order>()
                .Include(o => o.OrderStatus)
                .Include(o => o.Products)
                //only completed orders are calculated
                .Where(o  => o.OrderStatusId == 3)
                .ToListAsync();

            decimal revenue = orders.Sum(o => o.TotalOrderPrice());

            decimal afterTaxRevenue = revenue * 0.8m;

            return afterTaxRevenue;
        }


        public async Task<int> TotalOrders()
        {
            return await repo.AllReadonly<Order>().CountAsync();
        }

       
    }
}
