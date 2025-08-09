namespace Store.API.Infrastructure.Pagination;

public class PaginationUI
{
    private const int DefaultPageSize = 50;
    private int _pageSize = 0;
    public int PageSize
    {
    get => _pageSize;
    set => _pageSize = value > DefaultPageSize ? DefaultPageSize : value;
    }
    public int PageNumber { get; set; } = 0;
    
}