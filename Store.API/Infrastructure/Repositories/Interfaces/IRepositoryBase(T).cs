using Store.API.Infrastructure.Pagination;

namespace Store.API.Infrastructure.Repositories.Interfaces;

public interface IRepositoryBase<T>
{
    Task<T> GetValue(int Id);
    Task<IEnumerable<T>> GetValues();
    Task Remove(int Id);
    Task Remove(T entity);
    Task Update(T entity);
    Task Add(T entity);
    Task<PaginationMetaData<T>> GetEntities(PaginationUI _pag);
}