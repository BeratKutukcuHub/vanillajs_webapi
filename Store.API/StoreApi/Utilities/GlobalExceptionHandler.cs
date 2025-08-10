using System.Text.Json;
using Store.API.Common.Exceptions;

public class GlobalExceptionHandler
{
    private static async Task ResponseException(Exception _ex, HttpContext _context)
    {
        _context.Response.ContentType = "application/json";
        _context.Response.StatusCode = _ex switch
        {
            NonNegativeIndexerException => StatusCodes.Status400BadRequest,
            IndexerException => StatusCodes.Status404NotFound,
            PaginationException => StatusCodes.Status404NotFound,
            _ => StatusCodes.Status500InternalServerError
        };
        var result = new
        {
            message = _ex.Message,
            type = _ex.GetType().Name,
            statusCode = _context.Response.StatusCode
        };
        await _context.Response.WriteAsync(JsonSerializer.Serialize(result));
    }
    private RequestDelegate _next;
    public GlobalExceptionHandler(RequestDelegate next)
    {
        _next = next;
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