using Microsoft.AspNetCore.Mvc;
using trendify.Core.Contracts;
using trendify.Core.Models.Products;
using trendify.Infrastructure.Data.Entities;

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

        [HttpGet("featured")]
        public async Task<List<AllProductsModel>> GetFeatured()
        {
            return await _productService.GetFeatured();
        }

        [HttpPost]
        public async Task<Product> Create(CreateProductDto model)
        {
            var result = await _productService.CreateProduct(model);

            return result;
        }

        [HttpPut("{id}")]
        public async Task<Product> Update(int id, [FromBody] CreateProductDto model)
        {
            var result = await _productService.UpdateProduct(id, model);
            return result;
        }



        [HttpGet("totalCount")]
        public async Task<int> TotalCount()
        {
            return await _productService.TotalProducts();
        }
    }
}
