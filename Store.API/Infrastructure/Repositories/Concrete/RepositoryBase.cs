using Store.API.Domain;
using Store.API.Infrastructure.Data;
using Store.API.Infrastructure.Extension;
using Store.API.Infrastructure.Pagination;
using Store.API.Infrastructure.Repositories.Interfaces;

namespace Store.API.Infrastructure.Repositories.Concrete;

public class RepositoryBase<T> : IRepositoryBase<T> where T : BaseIdEntity, new()
{
    protected List<T> _database = ListDbContext<T>.Database;
    public async Task Add(T entity)
    {
        await Task.Delay(100);
        entity.Id = _database.Count;
        ListDbContext<T>.Database.Add(entity);
    }
    public async Task<T> GetValue(int Id)
    {
        await Task.Delay(100);
        return _database.FirstOrDefault(x => x.Id == Id);
    }
    public async Task<IEnumerable<T>> GetValues()
    {
        await Task.Delay(100);
        return _database.ToList();
    }
    public async Task Remove(int Id)
    {
        await Task.Delay(100);
        var entity = await GetValue(Id);
        _database.Remove(entity);
    }
    public async Task Remove(T entity)
    {
        await Task.Delay(100);
        _database.Remove(entity);
    }
    public async Task Update(T entity)
    {
        await Task.Delay(100);
        var response = _database.FirstOrDefault(pre => pre.Id == entity.Id);
        response = entity;
    }
    public async Task<PaginationMetaData<T>> GetEntities(PaginationUI _pag)
    {
        await Task.Delay(100);
        return _database.AsQueryable().Pagination(_dto: _pag)
        .MetaData(_database.Count,_pag.PageSize);
    }
}
