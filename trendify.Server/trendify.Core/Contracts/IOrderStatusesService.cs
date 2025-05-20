using trendify.Core.Models.Category;
using trendify.Core.Models.Statuses;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Contracts
{
    public interface IOrderStatusesService
    {
        public Task<List<OrderStatusesDto>> GetAllStatuses();

        public Task<OrderStatus> CreateStatus(CreateStatusDto model);

        Task<OrderStatus> EditStatus(int id, CreateStatusDto model);

        Task<bool> DeleteStatus(int id);
    }
}
