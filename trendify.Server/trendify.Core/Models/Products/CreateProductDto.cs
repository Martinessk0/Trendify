using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Core.Models.Products
{
    public class CreateProductDto
    {
        public string Name { get; set; } = null!;
        public string ShortDescription { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

        public decimal Price { get; set; }

        public string Category { get; set; } = null!;
    }
}
