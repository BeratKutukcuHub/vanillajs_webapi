namespace Store.API.Common.Dtos.UserDtos;

public record class UserGetDto : BaseGetDto
{
    public string? UserName { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public int Age { get; init; }
    public bool isActive { get; init; }
    public DateTime CreateAt { get; init; }
}


    