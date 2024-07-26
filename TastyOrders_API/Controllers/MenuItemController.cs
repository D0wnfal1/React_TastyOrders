using Azure;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TastyOrders_API.Data;
using TastyOrders_API.Models;
using TastyOrders_API.Models.Dto;
using TastyOrders_API.Services;
using TastyOrders_API.Utility;
using static System.Net.Mime.MediaTypeNames;

namespace TastyOrders_API.Controllers
{
    [Route("api/MenuItem")]
    [ApiController]
    public class MenuItemController : Controller
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        private readonly IBlobService _blobService;
        public MenuItemController(ApplicationDbContext db, IBlobService blobService)
        {
            _db = db;
            _response = new ApiResponse();
            _blobService = blobService;
        }
        [HttpGet]
        public async Task<IActionResult> GetMenuItemsAsync()
        {
            _response.Result = _db.MenuItems;
            _response.StatusCode = System.Net.HttpStatusCode.OK;
            return Ok(_response);
        }
        [HttpGet("{id:int}", Name = "GetMenuItemByIdAsync")]
        public async Task<IActionResult> GetMenuItemByIdAsync(int id)
        {
            MenuItem menuItem = _db.MenuItems.FirstOrDefault(x => x.Id == id);
            if (menuItem == null)
            {
                _response.StatusCode = System.Net.HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                return NotFound(_response);
            }
            _response.Result = menuItem;
            _response.StatusCode = System.Net.HttpStatusCode.OK;
            return Ok(_response);
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateMenuItemAsync([FromForm] MenuItemCreateDto menuItemCreateDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (menuItemCreateDto.File == null || menuItemCreateDto.File.Length == 0)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        return BadRequest();
                    }
                    else
                    {
                        string fileName = $"{Guid.NewGuid()}{Path.GetExtension(menuItemCreateDto.File.FileName)}";
                        MenuItem menuItemToCreate = new()
                        {
                            Name = menuItemCreateDto.Name,
                            Price = menuItemCreateDto.Price,
                            Category = menuItemCreateDto.Category,
                            SpecialTag = menuItemCreateDto.SpecialTag,
                            Description = menuItemCreateDto.Description,
                            Image = await _blobService.UploadBlob(fileName, SD.SD_Storage_Container, menuItemCreateDto.File)
                        };

                        _db.MenuItems.Add(menuItemToCreate);
                        _db.SaveChanges();

                        _response.Result = menuItemToCreate;
                        _response.StatusCode = System.Net.HttpStatusCode.Created;
                        return CreatedAtRoute("GetMenuItemByIdAsync", new { id = menuItemToCreate.Id }, _response);
                    }
                }
                else
                {
                    _response.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages =
                    new List<string> { ex.ToString() };
            }
            return _response;
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<ApiResponse>> UpdateMenuItemAsync(int id, [FromForm] MenuItemUpdateDto menuItemUpdateDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (menuItemUpdateDto == null || id != menuItemUpdateDto.Id)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        return BadRequest();
                    }
                    else
                    {
                        MenuItem menuItemFromDb = await _db.MenuItems.FindAsync(id);
                        if (menuItemFromDb == null)
                        {
                            _response.StatusCode = HttpStatusCode.BadRequest;
                            _response.IsSuccess = false;
                            return BadRequest();
                        }
                        menuItemFromDb.Name = menuItemUpdateDto.Name;
                        menuItemFromDb.Description = menuItemUpdateDto.Description;
                        menuItemFromDb.Category = menuItemUpdateDto.Category;
                        menuItemFromDb.Price = menuItemUpdateDto.Price;
                        menuItemFromDb.SpecialTag = menuItemUpdateDto.SpecialTag;

                        if (menuItemUpdateDto.File != null && menuItemUpdateDto.File.Length > 0)
                        {
                            await _blobService.DeleteBlob(menuItemFromDb.Image.Split('/').Last(), SD.SD_Storage_Container);
                            string fileName = $"{Guid.NewGuid()}{Path.GetExtension(menuItemUpdateDto.File.FileName)}";
                            menuItemFromDb.Image = await _blobService.UploadBlob(fileName, SD.SD_Storage_Container, menuItemUpdateDto.File);
                        }

                        _db.MenuItems.Update(menuItemFromDb);
                        _db.SaveChanges();

                        _response.Result = menuItemFromDb;
                        _response.StatusCode = System.Net.HttpStatusCode.NoContent;
                        return Ok(_response);
                    }
                }
                else
                {
                    _response.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages =
                    new List<string> { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ApiResponse>> DeleteMenuItemAsync(int id)
        {
            try
            {
                if (id == 0 )
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    return BadRequest();
                }
                MenuItem menuItemFromDb = await _db.MenuItems.FindAsync(id);

                if (menuItemFromDb == null || id != menuItemFromDb.Id)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    return BadRequest();
                }
                else
                {
                    await _blobService.DeleteBlob(menuItemFromDb.Image.Split('/').Last(), SD.SD_Storage_Container);
                    int miliseconds = 2000;
                    Thread.Sleep(miliseconds);

                    _db.MenuItems.Remove(menuItemFromDb);
                    _db.SaveChanges();
                    _response.Result = menuItemFromDb;
                    _response.StatusCode = System.Net.HttpStatusCode.NoContent;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages =
                    new List<string> { ex.ToString() };
            }
            return _response;
        }
    }
}
