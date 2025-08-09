using System.Reflection;
using Store.API.Domain;

namespace Store.API.Infrastructure.Data;

public static class SeedData
{
    private static (string firstName, string lastName, string userName, int age) RandomUser()
    {
        string[] firstNameEntity = {"Ahmet","Mehmet","Hakkı","Rüştü","Kamil","Uygar"
        , "Tolga","Yaşar","Hamza","Berat","Furkan","Gamze","Damla","Naim","Cemre","Salim","Salih","Gökhan","Polat"};
        string[] lastNameEntity = { "Özkan", "Demir", "Kartal", "Halis", "Ateş", "Ballı", "Camcı", "Ezmeci" };
        var random = new Random();
        var firstNameRandom = random.Next(0, firstNameEntity.Length);
        var lastNameRandom = random.Next(0, lastNameEntity.Length);
        string userNameEntity = $"{firstNameEntity[firstNameRandom].Substring(0, 3)+lastNameEntity[lastNameRandom]
        .Substring(0, 4)}";
        return (firstNameEntity[firstNameRandom], lastNameEntity[lastNameRandom], userNameEntity, random.Next(18, 99));
    }
    public static void SeedDataController<T>(this List<T> Database, PropertyInfo[] properties) where T : BaseIdEntity, new()
    {
        for (int y = 0; y <= 86; y++)
        {
            var user = RandomUser();
            var tEntity = new T();

                foreach (var prop in properties)
                {
                    if (prop.Name.Equals("Id"))
                        prop.SetValue(tEntity, y);

                    else if (prop.PropertyType == typeof(int) && prop.Name.ToLower() == "age")
                        prop.SetValue(tEntity,user.age);

                    else if (prop.PropertyType == typeof(string) && prop.Name.ToLower() == "username")
                    {
                        prop.SetValue(tEntity, user.userName);
                    }
                    else if (prop.PropertyType == typeof(string) && prop.Name.ToLower() == "lastname")
                    {
                        prop.SetValue(tEntity, user.lastName);
                    }
                    else if (prop.PropertyType == typeof(string) && prop.Name.ToLower() == "firstname")
                    {
                        prop.SetValue(tEntity, user.firstName);
                    }
                    else if (prop.PropertyType == typeof(DateTime))
                        prop.SetValue(tEntity, DateTime.Now);
                    else if (prop.PropertyType == typeof(bool))
                    {
                        prop.SetValue(tEntity, false);
                    }
            }
            Database.Add(tEntity);
        }
    }
}