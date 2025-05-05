using Microsoft.AspNetCore.Mvc;
using trendify.Server.Entities;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var products = new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Name = "Cola",
                    Price = 2.00m,
                    ShortDescription = "Coca-Cola",
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg"
                },
                new Product
                {
                    Id = 2,
                    Name = "Pepsi",
                    Price = 1.80m,
                    ShortDescription = "Pepsi-Cola",
                    ImageUrl = "https://cdncloudcart.com/29826/products/images/35920/pepsi-cola-ken--330-ml-663dc988f1174_1920x1920.jpeg?1715325588"
                },
                new Product
                {
                    Id = 3,
                    Name = "Orange Juice",
                    Price = 3.50m,
                    ShortDescription = "Freshly squeezed orange juice",
                    ImageUrl = "https://m.media-amazon.com/images/I/71uboskGHBL._SL1500_.jpg"
                },
                new Product
                {
                    Id = 4,
                    Name = "Bottled Water",
                    Price = 1.00m,
                    ShortDescription = "Spring water, 500 ml",
                    ImageUrl = "https://devin2u.bg/media/catalog/product/cache/c27388d20c7c52543d9bb519b036e8ba/d/e/devin-izvorna-voda-70240000000.jpg"
                },
                new Product
                {
                    Id = 5,
                    Name = "Lemonade",
                    Price = 2.75m,
                    ShortDescription = "Homemade style lemonade",
                    ImageUrl = "https://herbsandflour.com/wp-content/uploads/2020/05/Homemade-Lemonade-Recipe.jpg"
                },
                new Product
                {
                    Id = 6,
                    Name = "Iced Tea",
                    Price = 2.25m,
                    ShortDescription = "Brewed black tea, chilled",
                    ImageUrl = "https://bgonlineshop.com/Images/Items/Big/927.jpg"
                },
                new Product
                {
                    Id = 7,
                    Name = "Chocolate Bar",
                    Price = 1.50m,
                    ShortDescription = "Milk chocolate, 100 g",
                    ImageUrl = "https://www.lolliandpops.com/cdn/shop/files/lolli-and-pops-international-milka-caramel-filled-chocolate-bar-29733548785864.png?v=1698929462&width=640e"
                },
            };


            return Ok(products);
        }
    }
}
