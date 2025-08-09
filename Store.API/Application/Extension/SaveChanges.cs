
using Store.API.Domain;
using Store.API.Infrastructure.Repositories.Interfaces;

namespace Store.API.Application.Extension;

public static class SaveChangesExtension
{
    public static async Task SaveChangesAsync<T>(this IRepositoryBase<T> _repository) where T : BaseIdEntity
    {
        await Task.Delay(500);
    } 
}