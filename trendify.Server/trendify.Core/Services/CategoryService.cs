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

        public async Task<Category> CreateCategory(CreateCategoryDto model)
        {
            var category = new Category
            {
                Name = model.Name,
            };

            await repo.AddAsync(category);
            await repo.SaveChangesAsync();

            return category;
        }

        public async Task<bool> DeleteCategory(int id)
        {
            var category = await repo.GetByIdAsync<Category>(id);

            if (category == null || !category.IsActive)
            {
                return false;
            }

            category.IsActive = false;

            repo.Update(category);
            await repo.SaveChangesAsync();

            return true;
        }

        public async Task<Category> EditCategory(int id, CreateCategoryDto model)
        {
            var category = await repo.GetByIdAsync<Category>(id);

            if (category == null)
            {
                throw new ArgumentException($"Category not found {id}");
            }

            category.Name = model.Name;

            repo.Update(category);
            await repo.SaveChangesAsync();

            return category;
        }

        public async Task<List<CategoryDto>> GetAllCategories()
        {
            return await repo.AllReadonly<Category>().Where(p => p.IsActive).Select(c => new CategoryDto()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();
        }
    }
}
