using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Infrastructure.Pagination;

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
    [HttpPost]
    public async Task<IActionResult> PostUser([FromBody] UserAddDto _addDto)
    {
        var userResult = await _userManager.UserCreateValidation(_addDto);
        if (userResult.isValid)
        {
            return Ok();
        }
        else return BadRequest(userResult.ErrorMessages);
    }
    [HttpPut]
    public async Task<IActionResult> PostPut(UserUpdateDto _update)
    {
        var result = await _userManager.UserUpdateValidation(_update);
        if (result.isValid)
        {
            return Ok();
        }
        return BadRequest(result.ErrorMessages);
    }
}