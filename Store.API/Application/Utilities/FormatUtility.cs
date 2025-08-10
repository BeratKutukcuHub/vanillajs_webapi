using AutoMapper;
using Store.API.Common.Dtos;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Domain;

namespace Store.API.Application.Utilities;

public class FormatUtility
{
    private readonly IMapper _mapper;

    public FormatUtility(IMapper mapper)
    {
        _mapper = mapper;
    }

    private (string firstName, string lastName, string userName) Decomposition(BaseDto dtoUser)
    {
        var dto = _mapper.Map<User>(dtoUser);
        if (!string.IsNullOrWhiteSpace(dto.FirstName) && !string.IsNullOrWhiteSpace(dto.LastName) &&
        !string.IsNullOrWhiteSpace(dto.UserName))
        {
            var first = dto.FirstName.Trim();
            var last = dto.LastName.Trim();
            var userN = dto.UserName.Trim();
            return (
            char.ToUpper(first[0]) + first.Substring(1).ToLower(),
            char.ToUpper(last[0]) + last.Substring(1).ToLower(),
            char.ToUpper(userN[0]) + userN.Substring(1).ToLower()
        );
        }
        return ("", "", "");
    }
    public (string firstName, string lastName, string userName) Format(BaseDto _baseDto)
    {
        if (_baseDto is UserAddDto userAddDto)
        {
            var formattedNames = Decomposition(userAddDto);
            return formattedNames;
        }
        else if (_baseDto is SignupDto signUpDto)
        {
            var user = Decomposition(signUpDto);
            return user;
        }
        else
        {
            var updateDto = (UserUpdateDto)_baseDto;

            var first = updateDto.FirstName != null ? updateDto.FirstName.Trim() : "";
            var last = updateDto.LastName != null ? updateDto.LastName.Trim() : "";
            var userN = updateDto.UserName != null ? updateDto.UserName.Trim() : "";

            return (
                !string.IsNullOrWhiteSpace(updateDto.FirstName) ?
                char.ToUpper(first[0]) + first.Substring(1).ToLower() : "",
                !string.IsNullOrWhiteSpace(updateDto.LastName) ?
                char.ToUpper(last[0]) + last.Substring(1).ToLower() : "",
                !string.IsNullOrWhiteSpace(updateDto.UserName) ?
                char.ToUpper(userN[0]) + userN.Substring(1).ToLower() : ""
            );
        }
    }
}