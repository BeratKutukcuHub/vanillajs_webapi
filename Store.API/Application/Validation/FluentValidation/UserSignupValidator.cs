using FluentValidation;
using Store.API.Common.Dtos;
using Store.API.Domain;
using Store.API.Infrastructure.Repositories;

namespace Store.API.Common.Validation.FluentValidation;

public class UserSignupValidator : AbstractValidator<SignupDto>
{
    private IUserRepository _userRepository;
    public UserSignupValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;
        RuleFor(e => e.FirstName)
            .NotEmpty().WithMessage("First Name cannot empty.")
            .MinimumLength(3).WithMessage("First Name should be at least 3 characters.")
            .MaximumLength(10).WithMessage("First Name should be at most 10 characters.")
            .When(e => !string.IsNullOrWhiteSpace(e.FirstName));

        RuleFor(e => e.LastName)
            .NotEmpty().WithMessage("Last Name cannot empty.")
            .MinimumLength(2).WithMessage("Last Name should be at least 2 characters.")
            .MaximumLength(15).WithMessage("Last Name should be at most 15 characters.")
            .When(e => !string.IsNullOrWhiteSpace(e.LastName));

        RuleFor(e => e.UserName)
            .NotEmpty().WithMessage("User Name cannot empty.")
            .MustAsync(async (userName, cancellation) =>
            {
                if (string.IsNullOrWhiteSpace(userName))
                    return true;
                return await _userRepository.UserNameMatchCheckAsync(userName);
            })
            .WithMessage("This username already exists, please enter another value.");

        RuleFor(e => e.Age)
            .NotEmpty().WithMessage("Age cannot empty.")
            .ExclusiveBetween(18, 99)
            .WithMessage("You can't be under 18 and over 99.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email cannot be empty.")
            .EmailAddress().WithMessage("Please enter a valid email address.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password cannot be empty.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Must(ContainsDigit).WithMessage("Password must contain at least one digit.")
            .Must(ContainsUppercase).WithMessage("Password must contain at least one uppercase letter.")
            .Must(ContainsLowercase).WithMessage("Password must contain at least one lowercase letter.")
            .Must(ContainsAllowedSpecialChar).WithMessage("Password must contain at least one special character from the set: ., @, !, *, ?");
    }
    private bool ContainsDigit(string password)
    {
        return !string.IsNullOrEmpty(password) && password.Any(char.IsDigit);
    }

    private bool ContainsUppercase(string password)
    {
        return !string.IsNullOrEmpty(password) && password.Any(char.IsUpper);
    }

    private bool ContainsLowercase(string password)
    {
        return !string.IsNullOrEmpty(password) && password.Any(char.IsLower);
    }

    private bool ContainsAllowedSpecialChar(string password)
    {
        if (string.IsNullOrEmpty(password)) return false;
        char[] allowedSpecials = { '.', ',', '@', '!', '*', '?' };
        return password.Any(c => allowedSpecials.Contains(c));
    }
}