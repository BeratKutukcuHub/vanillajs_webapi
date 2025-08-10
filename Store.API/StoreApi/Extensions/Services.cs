using Store.API.Application.Services.Concrete;
using Store.API.Application.Services.Interfaces;
using Store.API.Infrastructure.Data;
using Store.API.Infrastructure.Repositories;
using Store.API.Infrastructure.Repositories.Concrete;
using Store.API.Infrastructure.Repositories.Interfaces;
using Store.API.Presentation.Filters.ActionFilter;

namespace Store.API.StoreApi.Extensions;

public static class Services
{
    public static void LayeredService(this IServiceCollection services)
    {
        services.AddScoped<IUserManager, UserManager>();
        services.AddScoped(typeof(ListDbContext<>));
        services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));
        services.AddScoped(typeof(IUserRepository), typeof(UserRepository));

        services.AddScoped<ExceptionControllerActionFilter>();
    }
}