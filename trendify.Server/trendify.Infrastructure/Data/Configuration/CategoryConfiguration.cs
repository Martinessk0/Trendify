using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Infrastructure.Data.Configuration
{
    internal class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasData(SeedCategories());
        }

        private List<Category> SeedCategories()
        {
            var categories = new List<Category>();

            var category = new Category()
            {
                Id = 1,
                Name = "Food"
            };

            categories.Add(category);

            category = new Category()
            {
                Id = 2,
                Name = "Drink"
            };

            categories.Add(category);

            category = new Category()
            {
                Id = 3,
                Name = "Detergent"
            };

            categories.Add(category);

            category = new Category()
            {
                Id = 4,
                Name = "Fruit"
            };

            categories.Add(category);

            category = new Category()
            {
                Id = 5,
                Name = "Vegetable"
            };

            categories.Add(category);

            return categories;
        }
    }
}
