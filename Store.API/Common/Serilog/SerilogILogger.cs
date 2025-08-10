using Microsoft.Extensions.Logging;

namespace Store.API.Common.Serilog;

public class SerilogILogger<T>
{
    private readonly ILogger<T> _logger;

    public SerilogILogger(ILogger<T> logger)
    {
        _logger = logger;
    }

    public void SerilogTrace(string Message) => _logger.LogTrace(Message);
    public void SerilogDebug(string Message) => _logger.LogDebug(Message);
    public void SerilogInformation(string Message) => _logger.LogInformation(Message);
    public void SerilogWarning(string Message) => _logger.LogWarning(Message);
    public void SerilogError(string Message) => _logger.LogError(Message);
}