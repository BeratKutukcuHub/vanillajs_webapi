namespace Store.API.Domain;

public class User : BaseIdEntity
{
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public bool isActive { get; set; }
    public List<string>? Roles { get; set; }
}