namespace Store.API.Common.Dtos;

public record RefreshTokenDto
{
    public int Id { get; init; }
    public DateTime RefreshToken { get; init; } = DateTime.Now.AddDays(30);
}