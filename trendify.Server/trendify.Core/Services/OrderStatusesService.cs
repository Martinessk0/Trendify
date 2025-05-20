using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Category;
using trendify.Core.Models.Statuses;
using trendify.Infractructure.Data.Common;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Services
{
    public class OrderStatusesService : IOrderStatusesService
    {
        private readonly IRepository repo;

        public OrderStatusesService(IRepository repo)
        {
            this.repo = repo;
        }

        public async Task<OrderStatus> CreateStatus(CreateStatusDto model)
        {
            var status = new OrderStatus
            {
                Name = model.Name,
            };

            await repo.AddAsync(status);
            await repo.SaveChangesAsync();

            return status;
        }

        public async Task<bool> DeleteStatus(int id)
        {
            var status = await repo.GetByIdAsync<OrderStatus>(id);

            if (status == null || !status.IsActive)
            {
                return false;
            }

            status.IsActive = false;

            repo.Update(status);
            await repo.SaveChangesAsync();

            return true;
        }

        public async Task<OrderStatus> EditStatus(int id, CreateStatusDto model)
        {
            var status = await repo.GetByIdAsync<OrderStatus>(id);

            if (status == null)
            {
                throw new ArgumentException($"Status not found {id}");
            }

            status.Name = model.Name;

            repo.Update(status);
            await repo.SaveChangesAsync();

            return status;
        }

        public async Task<List<OrderStatusesDto>> GetAllStatuses()
        {
            return await repo.AllReadonly<OrderStatus>().Select(c => new OrderStatusesDto()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();
        }

    }
}
