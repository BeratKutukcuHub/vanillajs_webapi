namespace Store.API.Common.Dtos;

public record ResponseTokenDto
{
    public string Token { get; set; } = string.Empty;
    public DateTime RefreshToken { get; set; }
}