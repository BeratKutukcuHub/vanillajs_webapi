using Store.API.Domain;
using Store.API.Infrastructure.Repositories.Interfaces;

namespace Store.API.Infrastructure.Repositories;

public interface IUserRepository : IRepositoryBase<User>
{
    Task<bool> UserNameMatchCheckAsync(string userName);
}