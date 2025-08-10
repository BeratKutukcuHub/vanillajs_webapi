using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Store.API.StoreApi.Extensions;

public static class JwtConfiguration
{
    public static void JwtConfigurationHandler(this IServiceCollection _service, IConfiguration _jsonData)
    {
        var dataDictionary = _jsonData.GetSection("JwtAuthentication");
        string secretKey = dataDictionary["SecretKey"];
        var byteSecretKey = Encoding.UTF8.GetBytes(secretKey);
        _service.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(byteSecretKey),
                ValidIssuer = dataDictionary["Issuer"],
                ValidAudience = dataDictionary["Audience"],
            };
        });
    }
}