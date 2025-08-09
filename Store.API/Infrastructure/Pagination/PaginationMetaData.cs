namespace Store.API.Infrastructure.Pagination;

public class PaginationMetaData<Dto>
{
    public List<Dto> Entities { get; set; }
    public int TotalItem { get; }
    public int PageTotal { get; }
    public PaginationMetaData(List<Dto> Entities, int pageTotal, int totalItem)
    {
        this.Entities = Entities;
        TotalItem = totalItem;
        PageTotal = pageTotal;
    }
}