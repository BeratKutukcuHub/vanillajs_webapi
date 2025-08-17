using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos;
using Store.API.Presentation.Filters.ActionFilter;

namespace Store.API.Presentation.Controllers;

[ApiController]
[Route("Auth")]
public class AuthController : ControllerBase
{
    private IUserManager _userManager;

    public AuthController(IUserManager userManager)
    {
        _userManager = userManager;
    }
    [HttpPost("Signin")]
    public async Task<IActionResult> SignIn(SigninDto _data)
    {
        var user = await _userManager.SigninCredantials(_data);
        return Ok(new { token = user.Token , refreshToken = user.RefreshTimeResult });
    }
    [ServiceFilter(typeof(ExceptionControllerActionFilter))]
    [HttpPost("Signup")]
    public async Task<IActionResult> SignUp(SignupDto _data)
    {
        var signupResult = await _userManager.SignupValidation(_data);
        if (!signupResult.isValid)
            return BadRequest(signupResult.ErrorMessages);
        await _userManager.SignRegister(_data);
        return Ok(new { message = "User created successfully with the given information." });
    }
    [HttpGet("Me")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> Me()
    {
        await Task.Delay(100);
        var userPrinciple = new
        {
            Id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
            UserName = User.FindFirst(ClaimTypes.Name)?.Value,
            Email = User.FindFirst(ClaimTypes.Email)?.Value,
            Country = User.FindFirst(ClaimTypes.Country)?.Value,
            Roles = User.FindAll(ClaimTypes.Role)?.Select(role => role.Value).ToList(),
            FirstName = User.FindFirst("firstName")?.Value,
            LastName = User.FindFirst("lastName")?.Value,
            Age = User.FindFirst("age")?.Value
        };
        return Ok(userPrinciple);
    }
    [HttpPost("Refresh")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> RefreshTokenAsync(RefreshTokenDto tokenDto)
    {
        var refresh = await _userManager.RefreshTokenAsync(tokenDto);
        return Ok(refresh);
    }
}