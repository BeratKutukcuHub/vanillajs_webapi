using System.Text.Json;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Core;
using Store.API.Common.Dtos;
using Store.API.Common.Serilog;
using Store.API.Domain;
using Store.API.Infrastructure.Utilities;

namespace Store.API.Infrastructure.Extension;

    public static class SigninExtension {
    public static async Task<(User user, bool isEqual)>
     SearchUser<T>(this List<User> signOperation, SigninDto data)
    {
        
        var userController = signOperation.FirstOrDefault(sign => sign.UserName.Equals(data.UserName)
        && sign.Password.Equals(HashPasswordGenerate.HashPassword(data.Password)));
        await Task.Delay(500);
        bool isEqual = userController is not null ? true : false;
        if (userController is null) return (userController ?? new User(), isEqual);
        return (
            userController, isEqual
        );
    }
}