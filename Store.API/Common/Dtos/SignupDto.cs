namespace Store.API.Common.Dtos;

public record class SignupDto : BaseDto
    {
        public string UserName { get; init; }
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public int Age { get; init; }
        public string Password { get; init; }
        public string Email { get; init; }
        public List<string>? Roles { get; init; }
    }