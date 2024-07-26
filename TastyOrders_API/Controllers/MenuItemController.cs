using Microsoft.AspNetCore.Mvc;
using TastyOrders_API.Data;
using TastyOrders_API.Models;

namespace TastyOrders_API.Controllers
{
    [Route("api/MenuItem")]
    [ApiController]
    public class MenuItemController : Controller
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        public MenuItemController(ApplicationDbContext db)
        {
            _db = db;
            _response = new ApiResponse();
        }
        [HttpGet]
        public async Task<IActionResult> GetMenuItemsAsync() 
        {
            _response.Result = _db.MenuItems;
            _response.StatusCode = System.Net.HttpStatusCode.OK;
            return Ok(_response);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetMenuItemByIdAsync(int id)
        {
            MenuItem menuItem = _db.MenuItems.FirstOrDefault(x => x.Id == id);
            if (menuItem == null)
            {
                _response.StatusCode = System.Net.HttpStatusCode.NotFound;
                return NotFound(_response);
            }
            _response.Result = menuItem;
            _response.StatusCode = System.Net.HttpStatusCode.OK;
            return Ok(_response);
        }
    }
}
