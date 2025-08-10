namespace Store.API.Common.Dtos;

public record class SigninDto
{
    public string UserName { get; set; }
    public string Password { get; set; }

}