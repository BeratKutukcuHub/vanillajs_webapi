using FluentValidation;
using Store.API.Common.Dtos.UserDtos;
using Store.API.Domain;
using Store.API.Infrastructure.Repositories;

namespace Store.API.Common.Validation.FluentValidation;

public class UserCreateValidator : AbstractValidator<UserAddDto>
{
    private IUserRepository _userRepository;
    public UserCreateValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        RuleFor(e => e.FirstName)
        .NotEmpty().WithMessage("First Name cannot empty.")
        .MinimumLength(3).MaximumLength(10).WithMessage("First Name should min 3 and max 10 lenght.")
        .When(e => !string.IsNullOrWhiteSpace(e.FirstName));

        RuleFor(e => e.LastName)
        .NotEmpty().WithMessage("Last Name cannot empty.")
        .MinimumLength(2).MaximumLength(15).WithMessage("Last Name should min 2 and max 15 lenght.")
        .When(e => !string.IsNullOrWhiteSpace(e.LastName));

        RuleFor(e => e.UserName)
        .NotEmpty().WithMessage("User name cannot empty.")
        .MustAsync(async (userName, cancellation) =>
            {
                if (string.IsNullOrWhiteSpace(userName))
                    return true; 
                return await _userRepository.UserNameMatchCheckAsync(userName);
            })
            .WithMessage("This username already exists, please enter another value.");

        RuleFor(e => e.Age)
        .ExclusiveBetween(18, 99).WithMessage("You can't be under 18 and over 99.");

    }
}