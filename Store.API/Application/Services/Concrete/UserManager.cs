using AutoMapper;
using FluentValidation;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Common.ValidationHandler;
using Store.API.Domain;
using Store.API.Infrastructure.Repositories.Interfaces;

namespace Store.API.Application.Services.Concrete;

public class UserManager : ServiceManager<UserGetDto, UserAddDto, UserUpdateDto, User>, IUserManager
{
    public UserManager(IRepositoryBase<User> repositoryBase, IMapper mapper, IValidator<UserAddDto> validator,
    IValidator<UserUpdateDto> _validator)
    : base(repositoryBase, mapper, validator, _validator)
    {
    }
    private (string firstName ,string lastName ,string userName) Format(BaseDto _baseDto)
    {
        if (_baseDto.GetType() == typeof(UserAddDto))
        {
            var addDto = (UserAddDto)_baseDto;
            if (!string.IsNullOrWhiteSpace(addDto.FirstName) && !string.IsNullOrWhiteSpace(addDto.LastName) &&
            !string.IsNullOrWhiteSpace(addDto.UserName))
            {
                var first = addDto.FirstName.Trim();
                var last = addDto.LastName.Trim();
                var userN = addDto.UserName.Trim();
                return (
                char.ToUpper(first[0]) + first.Substring(1).ToLower(),
                char.ToUpper(last[0]) + last.Substring(1).ToLower(),
                char.ToUpper(userN[0]) + userN.Substring(1).ToLower()
            );
            }
            return ("", "", "");
        }
        else
        {
            var updateDto = (UserUpdateDto)_baseDto;
                var first = updateDto.FirstName.Trim();
                var last = updateDto.LastName.Trim();
                var userN = updateDto.UserName.Trim();
            return (
            !string.IsNullOrWhiteSpace(updateDto.FirstName)? char.ToUpper(first[0]) + first.Substring(1).ToLower() : "",
            !string.IsNullOrWhiteSpace(updateDto.LastName)? char.ToUpper(last[0]) + last.Substring(1).ToLower() : "",
            !string.IsNullOrWhiteSpace(updateDto.UserName)? char.ToUpper(userN[0]) + userN.Substring(1).ToLower() : ""
            );
        }
    }
    public async Task<ValidationResultHandler> UserCreateValidation(UserAddDto _addUser)
    {
        var formatUser = Format(_addUser);
        _addUser.FirstName = formatUser.firstName;
        _addUser.LastName = formatUser.lastName;
        _addUser.UserName = formatUser.userName;
        return await EntityAdd(_addUser);
    }

    public async Task<ValidationResultHandler> UserUpdateValidation(UserUpdateDto _updateUser)
    {
        var formatList = Format(_updateUser);
        _updateUser.FirstName = !string.IsNullOrWhiteSpace(formatList.firstName) ? formatList.firstName : null;
        _updateUser.LastName = !string.IsNullOrWhiteSpace(formatList.lastName) ? formatList.lastName : null;
        _updateUser.UserName = !string.IsNullOrWhiteSpace(formatList.userName) ? formatList.userName : null;
        return await EntityUpdateByNewEntity(_updateUser);
    }
}
