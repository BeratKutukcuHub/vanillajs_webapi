using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Store.API.Application.Extension;
using Store.API.Application.Services.Interfaces;
using Store.API.Application.Utilities;
using Store.API.Common.Dtos;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Common.Exceptions;
using Store.API.Common.Serilog;
using Store.API.Common.ValidationHandler;
using Store.API.Domain;
using Store.API.Infrastructure.Repositories;
using Store.API.Infrastructure.Repositories.Interfaces;
using Store.API.Infrastructure.Utilities;

namespace Store.API.Application.Services.Concrete;

public class UserManager : ServiceManager<UserGetDto, UserAddDto, UserUpdateDto, User>, IUserManager
{
    private readonly FormatUtility _format;
    private readonly IConfiguration _config;
    private readonly IUserRepository _userRepository;
    public UserManager(IRepositoryBase<User> repositoryBase, IMapper mapper, IValidator<UserAddDto> validator,
    IValidator<UserUpdateDto> _validator, IValidator<SignupDto> validatorSignup, FormatUtility format,
    IUserRepository userRepository, IConfiguration config,
     SerilogILogger<ServiceManager<UserGetDto, UserAddDto, UserUpdateDto, User>> logger,IMemoryCache cache)
    : base(repositoryBase, mapper, validator, _validator, validatorSignup, logger,cache)
    {
        _format = format;
        _userRepository = userRepository;
        _config = config;
    }

    public async Task<ValidationResultHandler> UserCreateValidation(UserAddDto _addUser)
    {
        var formatUser = _format.Format(_addUser);
        var user = _mapper.Map<User>(_addUser);

        user.FirstName = formatUser.firstName;
        user.LastName = formatUser.lastName;
        user.UserName = formatUser.userName;
        var addUser = _mapper.Map<UserAddDto>(user);
        return await Check(addUser);
    }

    public async Task<ValidationResultHandler> UserUpdateValidation(UserUpdateDto _updateUser)
    {
        var formatList = _format.Format(_updateUser);
        var user = _mapper.Map<User>(_updateUser);
        user.FirstName = !string.IsNullOrWhiteSpace(formatList.firstName)
         ? formatList.firstName : null;
        user.LastName = !string.IsNullOrWhiteSpace(formatList.lastName)
         ? formatList.lastName : null;
        user.UserName = !string.IsNullOrWhiteSpace(formatList.userName)
         ? formatList.userName : null;
        var updateDto = _mapper.Map<UserUpdateDto>(user);
        return await Check(updateDto);
    }
    private JwtSecurityToken JwtCreate(UserGetDto user)
    {
        var jwt = _config.GetSection("JwtAuthentication");
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["SecretKey"]));
        var securityToken = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: JwtClaims(user),
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwt["Expire"])),
            signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
        );
        return securityToken;
    }
    private List<Claim> JwtClaims(UserGetDto userGetDto)
    {
        
        var claim = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, userGetDto.UserName ?? ""),
            new Claim(ClaimTypes.NameIdentifier, userGetDto.Id.ToString()),
            new Claim(ClaimTypes.Email, userGetDto.Email ?? ""),
            new Claim(ClaimTypes.Country, "Turkey"),
            new Claim("firstName" , userGetDto.FirstName?? ""),
            new Claim("lastName" , userGetDto.LastName?? ""),
            new Claim("age" , userGetDto.Age.ToString()),
        };
        foreach (var role in userGetDto.Roles)
        {
            claim.Add(new Claim(ClaimTypes.Role, role));
        }
        return claim;
    }
    public async Task<TokenDto> SigninCredantials(SigninDto signinData)
    {
        var user = await _userRepository.UserSearch(signinData);
        if (user.isEqual)
        {
            var usergetDto = _mapper.Map<UserGetDto>(user.user);
            string token = new JwtSecurityTokenHandler().WriteToken(JwtCreate(usergetDto));
            _logger.SerilogInformation("A user logged in.");
            return new TokenDto
            {
                User = usergetDto,
                isAuthentication = true,
                Token = token
            };
        }
        _logger.SerilogWarning("Login failed, no such user found.");
        await _userRepository.SaveChangesAsync();
        throw new UserNotFound();
    }

    public async Task<ValidationResultHandler> SignupValidation(SignupDto _data)
    {
        var result = await Check(_data);
        return result;
    }
    public async Task SignRegister(SignupDto dto)
    {
        var data = _format.Format(dto);
        var user = _mapper.Map<User>(dto);

        user.FirstName = data.firstName;
        user.LastName = data.lastName;
        user.UserName = data.userName;
        user.Password = HashPasswordGenerate.HashPassword(user.Password);
        _logger.SerilogInformation("A new user has registered.");
        await _userRepository.Add(user);
    }

    public async Task<ClaimsPrincipal> WhoIAm(string Token)
    {
        var dataDictionary = _config.GetSection("JwtAuthentication");
        byte[] secretKkey = Encoding.UTF8.GetBytes(dataDictionary["SecretKey"]);
        var token = new SymmetricSecurityKey(secretKkey);
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenValidator = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            IssuerSigningKey = token,
            ValidIssuer = dataDictionary["Issuer"],
            ValidAudience = dataDictionary["Audience"],
        };
        var tokenSolver = tokenHandler.ValidateToken(Token, tokenValidator, out _);
        if (tokenSolver is not null)
        {
            await _repositoryBase.SaveChangesAsync();
            return tokenSolver;
        }
        throw new NonTokenSolve();
    }
}
