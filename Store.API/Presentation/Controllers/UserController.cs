using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Infrastructure.Pagination;
using Store.API.Presentation.Filters.ActionFilter;

namespace Store.API.Presentation.Controllers;

[ApiController]
[Route("User")]
public class UserController : ControllerBase
{
    private IUserManager _userManager;
    private IHttpContextAccessor _httpContext;
    public UserController(IUserManager userManager, IHttpContextAccessor httpContext)
    {
        _userManager = userManager;
        _httpContext = httpContext;
    }
    [HttpGet]
    public async Task<IActionResult> GetUserPagination([FromQuery] PaginationUI _pagination)
    {
        var userPagination = await _userManager.GetEntitiesPagination(_pagination);
        _httpContext.HttpContext.Response.Headers.Add("x-pagination", JsonSerializer.Serialize(
            new
            {
                TotalPage = userPagination.PageTotal,
                TotalSize = userPagination.TotalItem
            }
        ));
        return Ok(userPagination.Entities);
    }
    [ServiceFilter(typeof(ExceptionControllerActionFilter))]
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> PostUserAsync([FromBody] UserAddDto _addDto)
    {
        await _userManager.EntityAdd(_addDto);
        return Ok();
    }
    [ServiceFilter(typeof(ExceptionControllerActionFilter))]
    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> PutUserAsync(UserUpdateDto _update)
    {
        await _userManager.EntityUpdateByNewEntity(_update);
        return Ok(new { message = "The user is updated by admin." });
    }
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _userManager.GetEntityById(id);
        return Ok(user);
    }
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteUser(int id)
    {
        await _userManager.EntityRemoveById(id);
        return NoContent();
    }
}