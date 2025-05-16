using trendify.Core.Models.Category;

namespace trendify.Core.Contracts
{
    public interface ICategoryService
    {
        public Task<List<CategoryDto>> GetAllCategories();
    }
}
