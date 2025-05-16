using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Category;
using trendify.Infractructure.Data.Common;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository repo;

        public CategoryService(IRepository repo)
        {
            this.repo = repo;
        }

        public async Task<List<CategoryDto>> GetAllCategories()
        {
            return await repo.AllReadonly<Category>().Select(c => new CategoryDto()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();
        }
    }
}
