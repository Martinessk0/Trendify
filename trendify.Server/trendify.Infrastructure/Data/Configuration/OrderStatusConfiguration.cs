using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Infrastructure.Data.Configuration
{
    internal class OrderStatusConfiguration : IEntityTypeConfiguration<OrderStatus>
    {
        public void Configure(EntityTypeBuilder<OrderStatus> builder)
        {
            builder.HasData(SeedOrderStatus());
        }

        private List<OrderStatus> SeedOrderStatus()
        {
            var statuses = new List<OrderStatus>();

            var status = new OrderStatus()
            {
                Id = 1,
                Name = "Pending"
            };

            statuses.Add(status);

            status = new OrderStatus()
            {
                Id = 2,
                Name = "In Progress"
            };

            statuses.Add(status);

            status = new OrderStatus()
            {
                Id = 3,
                Name = "Completed"
            };

            statuses.Add(status);

            status = new OrderStatus()
            {
                Id = 4,
                Name = "Canceled"
            };

            statuses.Add(status);

            return statuses;
        }
    }
}
