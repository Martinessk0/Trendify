using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Infrastructure.Data.Configuration
    {
        internal class ProductConfiguration : IEntityTypeConfiguration<Product>
        {
            public void Configure(EntityTypeBuilder<Product> builder)
            {
                builder.HasData(
                    new Product
                    {
                        Id = 101,
                        Name = "Cola",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
                        ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg",
                        Price = 2.00m,
                        CategoryId = 1,    // Drinks
                        IsActive = true,
                        CreatedAt = new DateTime(2025, 5, 14, 0, 0, 0),
                        ModifiedAt = new DateTime(2025, 5, 14, 0, 0, 0)
                    },
                    new Product
                    {
                        Id = 102,
                        Name = "Pepsi",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
                        ImageUrl = "https://cdncloudcart.com/29826/products/images/35920/pepsi-cola-ken--330-ml-663dc988f1174_1920x1920.jpeg?1715325588",
                        Price = 1.80m,
                        CategoryId = 1,    // Drinks
                        IsActive = true,
                        CreatedAt = new DateTime(2025, 5, 14, 0, 0, 0),
                        ModifiedAt = new DateTime(2025, 5, 14, 0, 0, 0)
                    },
                    new Product
                    {
                        Id = 103,
                        Name = "Orange Juice",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
                        ImageUrl = "https://m.media-amazon.com/images/I/71uboskGHBL._SL1500_.jpg",
                        Price = 3.50m,
                        CategoryId = 1,    // Drinks
                        IsActive = true,
                        CreatedAt = new DateTime(2025, 5, 14, 0, 0, 0),
                        ModifiedAt = new DateTime(2025, 5, 14, 0, 0, 0)
                    },
                    new Product
                    {
                        Id = 104,
                        Name = "Bottled Water",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
                        ImageUrl = "https://devin2u.bg/media/catalog/product/cache/c27388d20c7c52543d9bb519b036e8ba/d/e/devin-izvorna-voda-70240000000.jpg",
                        Price = 1.00m,
                        CategoryId = 1,    // Drinks
                        IsActive = true,
                        CreatedAt = new DateTime(2025, 5, 14, 0, 0, 0),
                        ModifiedAt = new DateTime(2025, 5, 14, 0, 0, 0)
                    },
                    new Product
                    {
                        Id = 105,
                        Name = "Lemonade",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
                        ImageUrl = "https://herbsandflour.com/wp-content/uploads/2020/05/Homemade-Lemonade-Recipe.jpg",
                        Price = 2.75m,
                        CategoryId = 1,    // Drinks
                        IsActive = true,
                        CreatedAt = new DateTime(2025, 5, 14, 0, 0, 0),
                        ModifiedAt = new DateTime(2025, 5, 14, 0, 0, 0)
                    },
                    new Product
                    {
                        Id = 106,
                        Name = "Iced Tea",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
                        ImageUrl = "https://bgonlineshop.com/Images/Items/Big/927.jpg",
                        Price = 2.25m,
                        CategoryId = 1,    // Drinks
                        IsActive = true,
                        CreatedAt = new DateTime(2025, 5, 14, 0, 0, 0),
                        ModifiedAt = new DateTime(2025, 5, 14, 0, 0, 0)
                    },
                    new Product
                    {
                        Id = 107,
                        Name = "Chocolate Bar",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
                        ImageUrl = "https://www.lolliandpops.com/cdn/shop/files/lolli-and-pops-international-milka-caramel-filled-chocolate-bar-29733548785864.png?v=1698929462&width=640e",
                        Price = 1.50m,
                        CategoryId = 2,    // Snack
                        IsActive = true,
                        CreatedAt = new DateTime(2025, 5, 14, 0, 0, 0),
                        ModifiedAt = new DateTime(2025, 5, 14, 0, 0, 0)
                    }
                );
            }
        }
    }
    

