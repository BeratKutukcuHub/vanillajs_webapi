using FluentValidation;
using Microsoft.AspNetCore.CookiePolicy;
using Store.API.Common.Profiles;
using Store.API.Common.Validation.FluentValidation;
using Store.API.Presentation.Controllers;

namespace Store.API.StoreApi.Extensions;

public static class Configuration
{
    public static void ConfigurationBuilderService(this IServiceCollection service)
    {
        service.AddControllers().AddApplicationPart(typeof(UserController).Assembly);
        service.AddValidatorsFromAssembly(typeof(UserCreateValidator).Assembly);
        
        service.AddSwaggerGen();
        
        service.AddAuthentication();
        service.AddAuthorization();
        service.AddCors(action => action.AddPolicy("Cors",policy =>
        {
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowAnyOrigin();
        }));
        service.AddEndpointsApiExplorer();
        service.AddHttpContextAccessor();
        service.AddAutoMapper(config =>
        {
            config.AddProfile(typeof(UserProfile));
        });
        service.AddLogging(config =>
        {
            config.AddConsole();
        });
        service.AddCookiePolicy(configuration =>
        {
            configuration.HttpOnly = HttpOnlyPolicy.Always;
            configuration.Secure = CookieSecurePolicy.Always;
        });
        service.AddRouting();
    }
    public static void ConfigurationAppService(this IApplicationBuilder app)
    {
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseRouting();
        app.UseCookiePolicy(new CookiePolicyOptions()
        {
            HttpOnly = HttpOnlyPolicy.Always,
            Secure = CookieSecurePolicy.Always,
        });
        app.UseCors("Cors");
    }
}