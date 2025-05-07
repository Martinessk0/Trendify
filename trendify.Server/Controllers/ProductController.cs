using Microsoft.AspNetCore.Mvc;
using trendify.Server.Data.Common;
using trendify.Server.Entities;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IRepository repo;
        public ProductController(IRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var products = repo.AllReadonly<Product>()
             .Where(h => h.IsActive);
            return Ok(products);
        }

        [HttpGet("featured")]
        public async Task<ActionResult<List<Product>>> GetAllFeaturedProducts()
        {
            var products = repo.AllReadonly<Product>()
                .Where(h => h.IsActive);
            var result = products.Where(x => x.IsFeatured == true);
            return Ok(result);
        }


        [HttpGet("details/{id}")]
        public async Task<ActionResult<Product>> GetProductById(string id)
        {
            //        var products = repo.AllReadonly<Product>()
            //.Where(h => h.IsActive);
            //        foreach (var prd in products)
            //        {
            //            if (prd.Id == id)
            //            {
            //                return prd;
            //            }
            //        }

            return NotFound();
        }
    }
}
