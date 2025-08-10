using Microsoft.AspNetCore.Mvc;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos;
using Store.API.Domain;
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
        return Ok(user.Token);
    }
    [ServiceFilter(typeof(ExceptionControllerActionFilter))]
    [HttpPost("Signup")]
    public async Task<IActionResult> SignUp(SignupDto _data)
    {
        var signupResult = await _userManager.SignupValidation(_data);
        if (!signupResult.isValid)
        return BadRequest(signupResult.ErrorMessages);
        await _userManager.SignRegister(_data);
        return Ok("Kayıt başarılı");
    }
}