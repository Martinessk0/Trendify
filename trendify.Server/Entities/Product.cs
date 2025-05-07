using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trendify.Server.Entities
{
    public class Product
    {
        [Key]
        public string Id { get; set; }

        public bool IsOnSale { get; set; } = false;

        public bool IsItNew { get; set; } = false;

        public bool IsFeatured { get; set; } = false;

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Category { get; set; } = null!;

        [Required]
        public string ShortDescription { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Required]
        public string ImageUrl { get; set; } = null!;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime ModifiedAt { get; set; } = DateTime.UtcNow;
    }
}
