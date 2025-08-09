namespace Store.API.Domain;

public class User : BaseIdEntity
{
    public string? UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public bool isActive { get; set; }
}