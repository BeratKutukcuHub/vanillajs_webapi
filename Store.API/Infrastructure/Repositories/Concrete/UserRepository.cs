using Store.API.Domain;

namespace Store.API.Infrastructure.Repositories.Concrete;

public class UserRepository : RepositoryBase<User>, IUserRepository
{
    public async Task<bool> UserNameMatchCheckAsync(string userName)
    {
        await Task.Delay(100);
        var user = _database.Find(predicate => predicate.UserName.Equals(userName));
        if (user is not null) return false;
        return true;
    }
}