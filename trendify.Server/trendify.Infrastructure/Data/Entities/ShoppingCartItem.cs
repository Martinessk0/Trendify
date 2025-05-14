using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using trendify.Infrastructure.Data.Constants;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Infractructure.Data.Entities
{
    public class ShoppingCartItem
    {
        public ShoppingCartItem(int productId, string name, decimal price, string imageUrl, int quantity)
        {
            ProductName = name;
            Price = price;
            Quantity = quantity;
            ProductId = productId;
            ImageUrl = imageUrl;
        }

        public ShoppingCartItem() { }
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "money")]
        [Precision(ShoppingCartItemConstants.PricePrecesion1, ShoppingCartItemConstants.PricePrecesion2)]
        public decimal Price { get; set; }

        [Required]
        [StringLength(ShoppingCartItemConstants.ImageURLMaxLength)]
        public string ImageUrl { get; set; }

        public int Quantity { get; set; }

        public int CartId { get; set; }

        [ForeignKey(nameof(CartId))]
        public ShoppingCart ShoppingCart { get; set; }

        [StringLength(ShoppingCartItemConstants.NameMaxLength)]
        public string ProductName { get; set; }

        public int ProductId { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

 
        public void AddQuantity(int quantity)
        {
            Quantity += quantity;
        }

        public void SetQuantity(int quantity)
        {
            Quantity = quantity;
        }
    }
}
