using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using trendify.Infractructure.Data.Entities;
using trendify.Infrastructure.Data.Configuration;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Infrastructure
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            :base(options) { }

        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<ShoppingCartItem> CartItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<Order> Orders { get; set; }

        public DbSet<DeliveryAddress> DeliveryAddresses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserOrder>()
               .HasKey(um => new
               {
                   um.UserId,
                   um.OrderId
               });

            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new RoleConfiguration());
            builder.ApplyConfiguration(new RoleAssignConfiguration());
            builder.ApplyConfiguration(new CategoryConfiguration());
            builder.ApplyConfiguration(new OrderStatusConfiguration());
            builder.ApplyConfiguration(new ProductConfiguration());

            base.OnModelCreating(builder);
        }
    }
}
