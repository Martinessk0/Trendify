using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using trendify.Infractructure.Data.Entities;
using trendify.Infrastructure.Data.Constants;

namespace trendify.Infrastructure.Data.Entities
{
    public class Order
    {
        public Order(string buyerId)
        {
            BuyerId = buyerId;
        }
        [Key]
        public int Id { get; set; }

        public string OrderNumber { get; set; }

        public string BuyerId { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [StringLength(OrderConstants.FullNameMaxLength)]
        public string FullName { get; set; }

        [StringLength(OrderConstants.PhoneNumberMaxLength)]
        public string PhoneNumber { get; set; }

        public DateTimeOffset OrderDate { get; private set; } = DateTimeOffset.UtcNow;

        public DeliveryAddress DeliveryAddress { get; set; }

        public int DeliveryAddressId { get; set; }

        public List<ShoppingCartItem> Products { get; set; } = new List<ShoppingCartItem>();

        [Required]
        public int OrderStatusId { get; set; } = 1;

        [ForeignKey(nameof(OrderStatusId))]
        public OrderStatus OrderStatus { get; set; }

        public decimal TotalOrderPrice()
        {
            var total = 0m;

            foreach (var item in Products)
            {
                total += item.Price * item.Quantity;
            }
            return total;
        }
    }
}
