using Microsoft.AspNetCore.Mvc;
using trendify.Core.Contracts;
using trendify.Core.Models.Products;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            this._productService = productService;
        }

        [HttpGet]
        public async Task<List<AllProductsModel>> All()
        {
            var result = await _productService.All();


            return result;
        }

        [HttpGet("details/{id}")]
        public async Task<ProductDetailsByIdModel> GetDetails(int id)
        {
            var result = await _productService.GetDetailsById(id);


            return result;
        }
    }
}
