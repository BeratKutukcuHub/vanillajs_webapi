
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Common.ValidationHandler;

namespace Store.API.Presentation.Filters.ActionFilter;

public class ExceptionControllerActionFilter : IAsyncActionFilter
{
    private readonly IUserManager serviceManager;

    public ExceptionControllerActionFilter(IUserManager serviceManager)
    {
        this.serviceManager = serviceManager;
    }
    private bool Provider(ActionExecutingContext context, ValidationResultHandler result)
    {
        if (!result.isValid)
        {
            foreach (var error in result.ErrorMessages)
            {
                    context.ModelState.AddModelError(error.Key, error.Value);
            }
            context.Result = new BadRequestObjectResult(JsonSerializer.Serialize(context.ModelState));
            return false;
        }
        return true;
    }
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        bool isValid = true;
        var parameter = context.ActionArguments.FirstOrDefault(kvp => kvp.Key.ToLower().Contains("dto"));
        if (parameter.Value is UserAddDto _addDto)
        {
            var provider = await serviceManager.UserCreateValidation(_addDto);
            isValid = Provider(context, provider);
        }
        else if (parameter.Value is SignupDto signupDto)
        {
            var provider = await serviceManager.SignupValidation(signupDto);
            isValid = Provider(context, provider);
        }
        else if (parameter.Value is UserUpdateDto _updateDto)
        {
            var provider = await serviceManager.UserUpdateValidation(_updateDto);
            isValid = Provider(context, provider);
        }
        if (isValid)
        {
            await next();
        }
        
    }
}