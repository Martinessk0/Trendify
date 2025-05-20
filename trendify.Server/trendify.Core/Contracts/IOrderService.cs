using trendify.Core.Models.Orders;

namespace trendify.Core.Contracts
{
    public interface IOrderService
    {
        Task<int> CreateOrderAsync(string userId, CreateOrderDto dto);
        Task<List<OrderSummaryModel>> GetOrdersByUserAsync(string userId);
        Task<OrderDetailsModel> GetOrderByIdAsync(string userId, int orderId);
    }
}
