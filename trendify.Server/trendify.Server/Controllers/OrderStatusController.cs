using Microsoft.AspNetCore.Mvc;
using trendify.Core.Contracts;
using trendify.Core.Models.Category;
using trendify.Core.Models.Statuses;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderStatusController : Controller
    {
        private readonly IOrderStatusesService _orderStatuesService;
        public OrderStatusController(IOrderStatusesService orderStatuesService)
        {
            this._orderStatuesService = orderStatuesService;
        }

        [HttpGet]
        public async Task<List<OrderStatusesDto>> All()
        {
            var result = await _orderStatuesService.GetAllStatuses();

            return result;
        }


        [HttpPost]
        public async Task<OrderStatus> Create(CreateStatusDto model)
        {
            var result = await _orderStatuesService.CreateStatus(model);

            return result;
        }

        [HttpPut("{id}")]
        public async Task<OrderStatus> Edit(int id, [FromBody] CreateStatusDto model)
        {
            var result = await _orderStatuesService.EditStatus(id, model);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _orderStatuesService.DeleteStatus(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
