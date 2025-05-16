using Microsoft.AspNetCore.Mvc;
using trendify.Core.Contracts;
using trendify.Core.Models.Category;
using trendify.Core.Models.Products;
using trendify.Core.Services;

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


    }
}
