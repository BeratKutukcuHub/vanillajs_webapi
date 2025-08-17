using Store.API.Common.Dtos.UserDtos;

namespace Store.API.Common.Dtos;

public record class TokenDto
{
    public UserGetDto? User { get; init; }
    public DateTime RefreshTimeResult { get; init; } = DateTime.Now.AddDays(30);
    public bool isAuthentication { get; set; } = false;
    public string? Token { get; init; }
}