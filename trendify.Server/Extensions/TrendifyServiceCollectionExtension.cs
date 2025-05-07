using Microsoft.AspNetCore.Cors.Infrastructure;
using trendify.Server.Data.Common;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class TrendifyServiceCollectionExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IRepository, Repository>();


            return services;
        }
    }
}
