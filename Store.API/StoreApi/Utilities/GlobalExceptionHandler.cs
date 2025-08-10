using System.Text.Json;
using Store.API.Common.Exceptions;
using Store.API.Common.Serilog;

public class GlobalExceptionHandler
{
    private SerilogILogger<GlobalExceptionHandler> _logger;
    private async Task ResponseException(Exception _ex, HttpContext _context)
    {
        _context.Response.ContentType = "application/json";
        _context.Response.StatusCode = _ex switch
        {
            NonNegativeIndexerException => StatusCodes.Status400BadRequest,
            IndexerException => StatusCodes.Status404NotFound,
            PaginationException => StatusCodes.Status404NotFound,
            UserNotFound => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };
        
        var result = new
        {
            message = _ex.Message,
            type = _ex.GetType().Name,
            statusCode = _context.Response.StatusCode
        };
        _logger.SerilogError(JsonSerializer.Serialize(result));
        await _context.Response.WriteAsync(result.message);
    }
    private RequestDelegate _next;
    public GlobalExceptionHandler(RequestDelegate next, SerilogILogger<GlobalExceptionHandler> logger)
    {
        _next = next;
        _logger = logger;
    }
    public async Task InvokeAsync(HttpContext _context)
    {
        try
        {
            await _next(context: _context);
        }
        catch (Exception _ex)
        {
            await ResponseException(_ex, _context);
        }
    }
}