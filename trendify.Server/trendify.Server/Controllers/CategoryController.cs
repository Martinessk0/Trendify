using Microsoft.AspNetCore.Mvc;
using trendify.Core.Contracts;
using trendify.Core.Models.Category;
using trendify.Core.Models.Products;
using trendify.Core.Services;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            this._categoryService = categoryService;
        }

        [HttpGet]
        public async Task<List<CategoryDto>> All()
        {
            var result = await _categoryService.GetAllCategories();

            return result;
        }


        [HttpPost]
        public async Task<Category> Create(CreateCategoryDto model)
        {
            var result = await _categoryService.CreateCategory(model);

            return result;
        }

        [HttpPut("{id}")]
        public async Task<Category> Edit(int id, [FromBody] CreateCategoryDto model)
        {
            var result = await _categoryService.EditCategory(id, model);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _categoryService.DeleteCategory(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }


    }
}
