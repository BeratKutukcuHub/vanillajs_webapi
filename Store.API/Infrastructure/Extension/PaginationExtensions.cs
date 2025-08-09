using Store.API.Infrastructure.Pagination;

namespace Store.API.Infrastructure.Extension;

public static class PaginationExtension
{
    public static IQueryable<Dto> Pagination<Dto>(this IQueryable<Dto> _query,
    PaginationUI _dto)
    {
        return _query.Skip(_dto.PageNumber * _dto.PageSize)
        .Take(_dto.PageSize);
    }
    public static PaginationMetaData<Dto> MetaData<Dto>(this IQueryable<Dto> _query,int Count, int PageSize)
    {
        var totalPages = (int)Math.Ceiling(((double)Count-1) / PageSize);
        return new PaginationMetaData<Dto>(_query.ToList(), totalPages, Count-1);
    }
}