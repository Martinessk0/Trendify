using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Products;
using trendify.Infractructure.Data.Common;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository repo;

        public ProductService(IRepository repo)
        {
            this.repo = repo;
        }


        public async Task<List<AllProductsModel>> All()
        {
            return await repo.AllReadonly<Product>().Where(p => p.IsActive).Select(p => new AllProductsModel()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Category = p.Category.Name,

            }).ToListAsync();
        }

        public async Task<ProductDetailsByIdModel> GetDetailsById(int id)
        {
            return await repo.AllReadonly<Product>()
                .Where(p => p.IsActive && p.Id == id)
                .Select(p => new ProductDetailsByIdModel()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Price = p.Price,
                }).FirstAsync();

        }
    }
}
