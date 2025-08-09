namespace Store.API.Common.Dtos.UserDtos;

public record class UserAddDto : BaseAddDto
{
    public string? UserName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Age { get; set; }
}