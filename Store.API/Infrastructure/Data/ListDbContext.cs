using Store.API.Domain;

namespace Store.API.Infrastructure.Data;

public class ListDbContext<T> where T : BaseIdEntity,new()
{
    public static List<T> Database { get; set; }

    static ListDbContext()
    {
        var properties = typeof(T).GetProperties(System.Reflection.BindingFlags.Public
        | System.Reflection.BindingFlags.Instance);
        if (Database is null)
        {
            Database = new();
            Database.SeedDataController<T>(properties);
        }
    }
} 