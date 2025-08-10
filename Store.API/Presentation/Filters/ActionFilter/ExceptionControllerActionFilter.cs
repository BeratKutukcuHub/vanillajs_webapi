
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos;
using Store.API.Common.Dtos.UserDtos;

namespace Store.API.Presentation.Filters.ActionFilter;

public class ExceptionControllerActionFilter : IAsyncActionFilter
{
    private readonly IUserManager serviceManager;

    public ExceptionControllerActionFilter(IUserManager serviceManager)
    {
        this.serviceManager = serviceManager;
    }
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var parameter = context.ActionArguments.FirstOrDefault(kvp => kvp.Key.ToLower().Contains("dto"));
        if (parameter.Value is UserAddDto _addDto)
        {
            var provider = await serviceManager.UserCreateValidation(_addDto);
            if (!provider.isValid)
            {
                foreach (var error in provider.ErrorMessages)
                {
                    context.ModelState.AddModelError(error.Key, error.Value);
                }
                context.Result = new BadRequestObjectResult(context.ModelState);
                return;
            }
        }
        else
        {
            var provider = await serviceManager.UserUpdateValidation((UserUpdateDto)parameter.Value);
            if (!provider.isValid)
            {
                foreach (var error in provider.ErrorMessages)
                {
                    context.ModelState.AddModelError(error.Key, error.Value);

                }
                context.Result = new BadRequestObjectResult(context.ModelState);
                return;
            }
        }
        await next();
    }
}