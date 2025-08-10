namespace Store.API.Common.Dtos.UserDtos;

public record class UserUpdateDto : BaseUpdateDto
{
    public string? UserName { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public int? Age { get; init; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public bool? isActive { get; init; }
    public List<string>? Roles { get; set; }
}