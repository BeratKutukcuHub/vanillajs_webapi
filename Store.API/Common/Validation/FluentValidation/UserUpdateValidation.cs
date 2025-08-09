using FluentValidation;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Infrastructure.Repositories;

namespace Store.API.Common.Validation.FluentValidation;

public class UserUpdateValidation : AbstractValidator<UserUpdateDto>
{
    private IUserRepository _userRepository;
    public UserUpdateValidation(IUserRepository userRepository)
    {
        RuleFor(e => e.FirstName)
            .MinimumLength(3).WithMessage("First Name should be at least 3 characters.")
            .MaximumLength(10).WithMessage("First Name should be at most 10 characters.")
            .When(e => !string.IsNullOrWhiteSpace(e.FirstName));

        RuleFor(e => e.LastName)
            .MinimumLength(2).WithMessage("Last Name should be at least 2 characters.")
            .MaximumLength(15).WithMessage("Last Name should be at most 15 characters.")
            .When(e => !string.IsNullOrWhiteSpace(e.LastName));

        RuleFor(e => e.UserName)
            .MustAsync(async (userName, cancellation) =>
            {
                if (string.IsNullOrWhiteSpace(userName))
                    return true; 
                return await _userRepository.UserNameMatchCheckAsync(userName);
            })
            .WithMessage("This username already exists, please enter another value.");

        RuleFor(e => e.Age)
            .ExclusiveBetween(18, 99)
            .When(e => e.Age.HasValue)
            .WithMessage("You can't be under 18 and over 99.");
        _userRepository = userRepository;
    }
}