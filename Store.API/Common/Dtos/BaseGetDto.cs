using Store.API.Common.Dtos;

namespace Store.API.Common.Dtos;

public record BaseGetDto : BaseIdDto
{
    public int Id { get; init; }
}
