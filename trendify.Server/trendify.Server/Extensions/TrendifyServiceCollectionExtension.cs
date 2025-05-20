using trendify.Core.Contracts;
using trendify.Core.Services;
using trendify.Infractructure.Data.Common;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class TrendifyServiceCollectionExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IRepository, Repository>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOrderStatusesService, OrderStatusesService>();

            return services;
        }
    }
}
