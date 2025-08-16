using Store.API.Common.Dtos;
using Store.API.Common.ValidationHandler;
using Store.API.Domain;
using Store.API.Infrastructure.Pagination;

namespace Store.API.Application.Services.Interfaces;

public interface IServiceManager<GetDto, AddDto, UpdateDto, Dto>
where GetDto : BaseGetDto where AddDto : BaseAddDto where UpdateDto : BaseUpdateDto
where Dto : BaseIdEntity
{
    Task<GetDto> GetEntityById(int Id);
    Task<IEnumerable<GetDto>> GetEntitiesValue();
    Task EntityRemoveById(int Id);
    Task EntityRemoveByEntityValue(GetDto entity);
    Task EntityUpdateByNewEntity(UpdateDto entity);
    Task EntityAdd(AddDto entity);
    Task<PaginationMetaData<GetDto>> GetEntitiesPagination(PaginationUI paginationUI);
    
}