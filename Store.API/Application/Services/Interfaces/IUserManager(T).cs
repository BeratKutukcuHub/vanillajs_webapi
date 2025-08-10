using Store.API.Common.Dtos;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Common.ValidationHandler;
using Store.API.Domain;

namespace Store.API.Application.Services.Interfaces;

public interface IUserManager : IServiceManager<UserGetDto, UserAddDto, UserUpdateDto, User>
{
    Task<ValidationResultHandler> UserCreateValidation(UserAddDto _addUser);
    Task<ValidationResultHandler> UserUpdateValidation(UserUpdateDto _updateUser);
    Task<TokenDto> SigninCredantials(SigninDto signinData);
    Task<ValidationResultHandler> SignupValidation(SignupDto _data);
    Task SignRegister(SignupDto dto);
}