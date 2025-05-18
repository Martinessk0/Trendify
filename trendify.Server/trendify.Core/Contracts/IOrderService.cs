using trendify.Core.Models.Orders;

namespace trendify.Core.Contracts
{
    public interface IOrderService
    {
        Task<List<OrderSummaryModel>> GetOrdersForUserAsync(string userId);
        Task<OrderDetailsModel?> GetOrderDetailsAsync(string userId, int orderId);
        Task<OrderDetailsModel> CreateOrderAsync(string userId, CreateOrderDto model);
        Task<bool> UpdateOrderStatusAsync(int orderId, int newStatusId);
        Task<bool> CancelOrderAsync(string userId, int orderId);
    }
}
