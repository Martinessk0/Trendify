using trendify.Core.Models.Orders;

namespace trendify.Core.Contracts
{
    public interface IOrderService
    {
        Task<int> CreateOrderAsync(string userId, CreateOrderModel dto);
        Task<List<OrderSummaryModel>> GetOrdersByUserAsync(string userId);
        Task<OrderDetailsModel> GetOrderByIdAsync(string userId, int orderId);
        Task<List<OrderSummaryModel>> GetRecentOrdersByUserAsync(int count);
        Task<decimal> TotalRevenue();
        Task<int> TotalOrders();
    }
}
