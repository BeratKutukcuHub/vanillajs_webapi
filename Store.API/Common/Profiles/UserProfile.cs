using AutoMapper;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Domain;

namespace Store.API.Common.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserGetDto>().ReverseMap();
        CreateMap<User, UserUpdateDto>().ReverseMap();
        CreateMap<User, UserAddDto>().ReverseMap();
    }
}