using trendify.Core.Models.Category;
using trendify.Core.Models.Products;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Contracts
{
    public interface ICategoryService
    {
        public Task<List<CategoryDto>> GetAllCategories();

        public Task<Category> CreateCategory(CreateCategoryDto model);

        Task<Category> EditCategory(int id, CreateCategoryDto model);

        Task<bool> DeleteCategory(int id);
    }
}
