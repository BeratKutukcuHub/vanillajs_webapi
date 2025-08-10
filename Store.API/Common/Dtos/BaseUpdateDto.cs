namespace Store.API.Common.Dtos;

public record BaseUpdateDto : BaseDto, BaseIdDto
{
    public int Id { get; init; }
}
