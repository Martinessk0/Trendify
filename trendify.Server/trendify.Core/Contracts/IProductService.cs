using trendify.Core.Models.Products;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Contracts
{
    public interface IProductService
    {
        public Task<List<AllProductsModel>> All();

        public Task<List<AllProductsModel>> GetFeatured();

        public Task<ProductDetailsByIdModel> GetDetailsById(int id);

        public Task<int> TotalProducts();

        public Task<Product> CreateProduct(CreateProductDto model);

        Task<Product> EditProduct(int id, CreateProductDto model);

        Task<bool> DeleteProduct(int id);


    }
}
