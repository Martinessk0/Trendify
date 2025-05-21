using trendify.Core.Models.Orders;

namespace trendify.Core.Contracts
{
    public interface IOrderService
    {
        Task<int> CreateOrderAsync(string userId, CreateOrderModel dto);
        Task<List<OrderSummaryModelModel>> GetOrdersByUserAsync(string userId);
        Task<OrderDetailsModel> GetOrderByIdAsync(string userId, int orderId);

        public Task<int> TotalOrders();
    }
}
