

namespace Store.API.StoreApi.Extensions;

public static class Middlewares
{
    public static void MiddlewareService(this IApplicationBuilder _service)
    {
        _service.UseMiddleware<GlobalExceptionHandler>();
    }
}

