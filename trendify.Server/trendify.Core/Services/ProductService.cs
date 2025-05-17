using Microsoft.EntityFrameworkCore;
using trendify.Core.Contracts;
using trendify.Core.Models.Products;
using trendify.Infractructure.Data.Common;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository repo;

        public ProductService(IRepository repo)
        {
            this.repo = repo;
        }


        public async Task<List<AllProductsModel>> All()
        {
            return await repo.AllReadonly<Product>().Where(p => p.IsActive).Select(p => new AllProductsModel()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Category = p.Category.Name,
                IsOnSale = p.IsOnSale,
                IsItNew = p.IsItNew,
                IsFeatured = p.IsFeatured,

            }).ToListAsync();
        }

        public async Task<ProductDetailsByIdModel> GetDetailsById(int id)
        {
            return await repo.AllReadonly<Product>()
                .Where(p => p.IsActive && p.Id == id)
                .Select(p => new ProductDetailsByIdModel()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Price = p.Price,
                }).FirstAsync();

        }

        public async Task<List<AllProductsModel>> GetFeatured()
        {
            return await repo.AllReadonly<Product>().Where(p => p.IsActive && p.IsFeatured).Select(p => new AllProductsModel()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Category = p.Category.Name,

            }).ToListAsync();
        }

        public async Task<Product> CreateProduct(CreateProductDto model)
        {
            var category = await repo.AllReadonly<Category>()
                                     .FirstOrDefaultAsync(c => c.Name == model.Category);

            if (category == null)
            {
                throw new ArgumentException("Category not found");
            }

            var product = new Product
            {
                Name = model.Name,
                IsFeatured = model.IsFeatured,
                IsItNew = model.IsItNew,
                IsOnSale = model.IsOnSale,
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                Price = model.Price,
                CategoryId = category.Id,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow,
            };

            await repo.AddAsync(product);
            await repo.SaveChangesAsync();

            return product;
        }


        public async Task<Product> UpdateProduct(int id, CreateProductDto model)
        {
            var product = await repo.GetByIdAsync<Product>(id);

            if (product == null || !product.IsActive)
            {
                throw new ArgumentException("Product not found");
            }

            var category = await repo.AllReadonly<Category>()
                                     .FirstOrDefaultAsync(c => c.Name == model.Category);

            if (category == null)
            {
                throw new ArgumentException("Category not found");
            }

            product.Name = model.Name;
            product.Description = model.Description;
            product.ImageUrl = model.ImageUrl;
            product.Price = model.Price;
            product.IsItNew = model.IsItNew;
            product.IsOnSale = model.IsOnSale;
            product.IsFeatured = model.IsFeatured;
            product.CategoryId = category.Id;
            product.ModifiedAt = DateTime.UtcNow;

            repo.Update(product);
            await repo.SaveChangesAsync();

            return product;
        }



        public async Task<int> TotalProducts()
        {
            return await repo.AllReadonly<Product>().Where(p => p.IsActive).CountAsync();
        }
    }
}
