using Microsoft.AspNetCore.Mvc;
using trendify.Server.Entities;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        List<Product> products = new List<Product>
            {
                new Product
                {
                    Id = "1",
                    Name = "Cola",
                    Category = "Drinks",
                    Price = 2.00m,
                    ShortDescription = "Coca-Cola",
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg"
                },
                new Product
                {
                    Id = "2",
                    Name = "Pepsi",
                    isItNew = true,
                    isOnSale = true,
                    Category = "Drinks",
                    Price = 1.80m,
                    ShortDescription = "Pepsi-Cola",
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    ImageUrl = "https://cdncloudcart.com/29826/products/images/35920/pepsi-cola-ken--330-ml-663dc988f1174_1920x1920.jpeg?1715325588"
                },
                new Product
                {
                    Id = "3",
                    Name = "Orange Juice",
                    Category = "Drinks",
                    Price = 3.50m,
                    ShortDescription = "Freshly squeezed orange juice",
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    ImageUrl = "https://m.media-amazon.com/images/I/71uboskGHBL._SL1500_.jpg"
                },
                new Product
                {
                    Id = "4",
                    Name = "Bottled Water",
                    Category = "Drinks",
                    Price = 1.00m,
                    ShortDescription = "Spring water, 500 ml",
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    ImageUrl = "https://devin2u.bg/media/catalog/product/cache/c27388d20c7c52543d9bb519b036e8ba/d/e/devin-izvorna-voda-70240000000.jpg"
                },
                new Product
                {
                    Id = "5",
                    Name = "Lemonade",
                    isOnSale = true,
                    Category = "Drinks",
                    Price = 2.75m,
                    ShortDescription = "Homemade style lemonade",
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    ImageUrl = "https://herbsandflour.com/wp-content/uploads/2020/05/Homemade-Lemonade-Recipe.jpg"
                },
                new Product
                {
                    Id = "6",
                    Name = "Iced Tea",
                    isOnSale = true,
                    Category = "Drinks",
                    Price = 2.25m,
                    ShortDescription = "Brewed black tea, chilled",
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    ImageUrl = "https://bgonlineshop.com/Images/Items/Big/927.jpg"
                },
                new Product
                {
                    Id = "7",
                    Name = "Chocolate Bar",
                    isItNew = true,
                    Category = "Snack",
                    Price = 1.50m,
                    ShortDescription = "Milk chocolate, 100 g",
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    ImageUrl = "https://www.lolliandpops.com/cdn/shop/files/lolli-and-pops-international-milka-caramel-filled-chocolate-bar-29733548785864.png?v=1698929462&width=640e"
                },
            };

        
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {     
            return Ok(products);
        }


           [HttpGet("details/{id}")]
           public async Task<ActionResult<Product>> GetProductById(string id){
                foreach(var prd in products){
                    if(prd.Id == id){
                    return prd;
                    }
                }

            return NotFound();
           }
    }
}
