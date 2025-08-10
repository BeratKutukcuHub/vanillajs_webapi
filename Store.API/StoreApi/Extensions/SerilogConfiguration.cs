using Serilog;

namespace Store.API.StoreApi.Extensions;

public static class SerilogConfiguration
{
    public static void SerilogService(this WebApplicationBuilder _service)
    {
        Log.Logger = new LoggerConfiguration().
        ReadFrom.Configuration(_service.Configuration)
        .CreateLogger();
        _service.Host.UseSerilog();
    }
}