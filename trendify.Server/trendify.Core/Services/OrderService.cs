using trendify.Core.Contracts;
using trendify.Infractructure.Data.Common;

namespace trendify.Core.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository repo;
        public OrderService(IRepository repo) => this.repo = repo;


    }
}
