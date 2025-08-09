namespace Store.API.Common.Dtos.UserDtos;

public record class UserGetDto : BaseGetDto
{
    public int Id { get; set; }
    public string? UserName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Age { get; set; }
    public bool isActive { get; set; }
    public DateTime CreateAt { get; set; }
}


    