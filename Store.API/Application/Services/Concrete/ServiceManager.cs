
using Store.API.Application.Extension;
using AutoMapper;
using FluentValidation;
using Store.API.Application.Services.Interfaces;
using Store.API.Common.Dtos;
using Store.API.Common.ValidationHandler;
using Store.API.Domain;
using Store.API.Infrastructure.Pagination;
using Store.API.Infrastructure.Repositories.Interfaces;
using Store.API.Common.Exceptions;

namespace Store.API.Application.Services.Concrete;

public class ServiceManager<GetDto, AddDto, UpdateDto, Dto> : IServiceManager<GetDto, AddDto, UpdateDto, Dto>
where GetDto : BaseGetDto
where AddDto : BaseAddDto
where UpdateDto : BaseUpdateDto
where Dto : BaseIdEntity
{
    protected readonly IRepositoryBase<Dto> _repositoryBase;
    protected readonly IMapper _mapper;
    protected readonly IValidator<AddDto> _validatorCreate;
    protected readonly IValidator<UpdateDto> _validatorUpdate;
    public ServiceManager(IRepositoryBase<Dto> repositoryBase, IMapper mapper, IValidator<AddDto> validator,
     IValidator<UpdateDto> validatorUpdate)
    {
        _repositoryBase = repositoryBase;
        _mapper = mapper;
        _validatorCreate = validator;
        _validatorUpdate =
        _validatorUpdate = validatorUpdate;
    }
    protected async Task CheckIndex(int Id)
    {
        if (Id < 0) throw new NonNegativeIndexerException();
        var entity = await _repositoryBase.GetValue(Id);
        if (entity is null) throw new IndexerException();
        return;
    }
    protected async Task<ValidationResultHandler> Check(BaseDto entity)
    {
        var errorMessageList = new Dictionary<string, string>();
        if (entity.GetType() == typeof(AddDto))
        {
            var validate = await _validatorCreate.ValidateAsync((AddDto)entity);
            if (!validate.IsValid)
            {
                validate.Errors.ForEach(error => errorMessageList.Add(error.PropertyName, error.ErrorMessage));
                return new ValidationResultHandler(false, errorMessageList);
            }
        }
        else
        {
            var validate = await _validatorUpdate.ValidateAsync((UpdateDto)entity);
            if (!validate.IsValid)
            {
                validate.Errors.ForEach(error => errorMessageList.Add(error.PropertyName, error.ErrorMessage));
                return new ValidationResultHandler(false, errorMessageList);
            }
        }
        return new ValidationResultHandler(true, null);
    }
    public async Task<ValidationResultHandler> EntityAdd(AddDto entity)
    {
        var check = await Check(entity);
        if (check.isValid)
        {
            var mapEntity = _mapper.Map<Dto>(entity);
            await _repositoryBase.Add(mapEntity);
            await _repositoryBase.SaveChangesAsync();
            return check;
        }
        return check;
    }

    public async Task EntityRemoveByEntityValue(GetDto entity)
    {
        var mapEntity = _mapper.Map<Dto>(entity);
        await CheckIndex(mapEntity.Id);
        await _repositoryBase.Remove(mapEntity);
    }

    public async Task EntityRemoveById(int Id)
    {
        await CheckIndex(Id);
        await _repositoryBase.Remove(Id);
    }

    public async Task<ValidationResultHandler> EntityUpdateByNewEntity(UpdateDto entity)
    {
        await CheckIndex(entity.Id);
        var check = await Check(entity);
        if (check.isValid)
        {
            var mapEntity = _mapper.Map<Dto>(entity);
            await _repositoryBase.Update(mapEntity);
            await _repositoryBase.SaveChangesAsync();
            return check;
        }
        else return check;
    }

    public async Task<PaginationMetaData<GetDto>> GetEntitiesPagination(PaginationUI paginationUI)
    {
        var repos = await _repositoryBase.GetEntities(paginationUI);
        if (repos.Entities.Count <= 0) throw new PaginationException();
        return new PaginationMetaData<GetDto>(_mapper.Map<List<GetDto>>(repos.Entities),
        repos.PageTotal, repos.TotalItem);
    }

    public async Task<IEnumerable<GetDto>> GetEntitiesValue()
    {
        var response = await _repositoryBase.GetValues();
        var mapEntities = _mapper.Map<List<GetDto>>(response);
        return mapEntities;
    }

    public async Task<GetDto> GetEntityById(int Id)
    {
        await CheckIndex(Id);
        var response = await _repositoryBase.GetValue(Id);
        return _mapper.Map<GetDto>(response);

    }
}
