using System.Security.Cryptography;
using System.Text;

namespace Store.API.Infrastructure.Utilities;

public static class HashPasswordGenerate
{
    public static string HashPassword(string password)
    {
        string passwordHash;
        using (var shaHash = SHA256.Create())
        {
            var hashPassword = shaHash.ComputeHash(Encoding.UTF8.GetBytes(password));
            passwordHash = Convert.ToBase64String(hashPassword);
        }
        return passwordHash;
    }
}