using Store.API.Domain;
using Store.API.Infrastructure.Utilities;

namespace Store.API.Infrastructure.Data;

public static class SeedAdmin
{
    public static void AddAdminUserData(int count)
    {
        ListDbContext<User>.Database
        .Add(new User
        {
            Id = count,
            Age = 25,
            Email = "berat_kutukcuu@gmail.com",
            FirstName = "Berat",
            LastName = "Kutukcu",
            isActive = false,
            UserName = "Beratkut",
            Password = HashPasswordGenerate.HashPassword("Ber@t718"),
            Roles = new()
            {
                "User",
                "Admin"
            },
        });
    }
}