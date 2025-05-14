using trendify.Core.Models.Products;

namespace trendify.Core.Contracts
{
    public interface IProductService
    {
        public Task<List<AllProductsModel>> All();

        public Task<ProductDetailsByIdModel> GetDetailsById(int id);
    }
}
