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
    private int _pageNumber = 0;
    public int PageNumber { get => _pageNumber; set => _pageNumber = value < 0 ? _pageNumber : value; }
    
}