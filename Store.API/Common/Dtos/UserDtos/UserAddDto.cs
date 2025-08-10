namespace Store.API.Common.Dtos.UserDtos;

public record class UserAddDto : BaseAddDto
{
    public string? UserName { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public List<string>? Roles { get; set; }
    public int Age { get; init; }
}