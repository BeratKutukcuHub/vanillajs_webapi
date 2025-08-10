using AutoMapper;
using Store.API.Common.Dtos;
using Store.API.Domain;
using Store.API.Infrastructure.Utilities;

namespace Store.API.Infrastructure.Extension;

    public static class SigninExtension
{
    public static async Task<(User user, bool isEqual)>
     SearchUser<T>(this List<User> signOperation, SigninDto data)
    {
        var userController = signOperation.FirstOrDefault(sign => sign.UserName.Equals(data.UserName)
        && sign.Password.Equals(HashPasswordGenerate.HashPassword(data.Password)));
        await Task.Delay(500);
        bool isEqual = userController is not null ? true : false;

        return (
            userController ?? new User(), isEqual
        );
    }
}