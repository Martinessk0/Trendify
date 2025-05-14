using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using trendify.Infrastructure.Data.Constants;

namespace trendify.Infrastructure.Data.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(ProductConstants.NameMaxLength)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(ProductConstants.DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [StringLength(ProductConstants.ImageURLMaxLength)]
        public string ImageUrl { get; set; } = null!;

        [Required]
        [Column(TypeName = "money")]
        [Precision(ProductConstants.PricePrecesion1, ProductConstants.PricePrecesion2)]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; } = null!;

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
    }
}
