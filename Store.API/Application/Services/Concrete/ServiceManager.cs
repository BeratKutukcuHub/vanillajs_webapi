
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
using FluentValidation.Results;
using Store.API.Common.Serilog;

namespace Store.API.Application.Services.Concrete;

public class ServiceManager<GetDto, AddDto, UpdateDto, Dto> : IServiceManager<GetDto, AddDto, UpdateDto, Dto>
where GetDto : BaseGetDto
where AddDto : BaseAddDto
where UpdateDto : BaseUpdateDto
where Dto : BaseIdEntity
{
    protected readonly SerilogILogger<ServiceManager<GetDto,AddDto,UpdateDto,Dto>> _logger;
    protected readonly IRepositoryBase<Dto> _repositoryBase;
    protected readonly IMapper _mapper;
    protected readonly IValidator<AddDto> _validatorCreate;
    protected readonly IValidator<SignupDto> _validatorSignup;
    protected readonly IValidator<UpdateDto> _validatorUpdate;
    public ServiceManager(IRepositoryBase<Dto> repositoryBase, IMapper mapper, IValidator<AddDto> validator,
     IValidator<UpdateDto> validatorUpdate, IValidator<SignupDto> validatorSignup, SerilogILogger<ServiceManager<GetDto, AddDto, UpdateDto, Dto>> logger)
    {
        _repositoryBase = repositoryBase;
        _mapper = mapper;
        _validatorCreate = validator;
        _validatorUpdate =
        _validatorUpdate = validatorUpdate;
        _validatorSignup = validatorSignup;
        _logger = logger;
    }
    protected async Task CheckIndex(int Id)
    {
        if (Id < 0)
        {
            _logger.SerilogDebug("An ID value less than 0 was entered.");  
            throw new NonNegativeIndexerException();  
        }
        var entity = await _repositoryBase.GetValue(Id);
        if (entity is null)
        {
            _logger.SerilogWarning("The requested user was not found.");
            throw new IndexerException();
        }
        return;
    }
    private ValidationResultHandler ValidationResultAsync(ValidationResult validate)
    {
        var errorMessageList = new Dictionary<string, string>();
        int indis = 0;
        if (!validate.IsValid)
        {
            _logger.SerilogWarning($"A validation error occurred.");
            validate.Errors.ForEach(error => errorMessageList.Add(error.PropertyName + $" - {indis++}"
            , error.ErrorMessage));
            return new ValidationResultHandler(false, errorMessageList);
        }
        _logger.SerilogInformation($"Validation successful.");
        return new ValidationResultHandler(true, null);
    }
    protected async Task<ValidationResultHandler> Check(BaseDto entity)
    {
        if (entity is AddDto add)
        {
            _logger.SerilogTrace("AddDto - The validation process has begun.");
            var validate = await _validatorCreate.ValidateAsync(add);
            return ValidationResultAsync(validate);
        }
        else if (entity is SignupDto signup)
        {
            _logger.SerilogTrace("Signup - The validation process has begun.");
            var validate = await _validatorSignup.ValidateAsync(signup);
            return ValidationResultAsync(validate);
        }
        else
        {
            _logger.SerilogTrace("UpdateDto - The validation process has begun.");
            var validate = await _validatorUpdate.ValidateAsync((UpdateDto)entity);
            return ValidationResultAsync(validate);
        }
    }
    public async Task EntityAdd(AddDto entity)
    {
        _logger.SerilogInformation("Entity created.");
        var entityBuild = _mapper.Map<Dto>(entity);
        await _repositoryBase.Add(entityBuild);
    }
    public async Task EntityRemoveByEntityValue(GetDto entity)
    {
        var mapEntity = _mapper.Map<Dto>(entity);
        await CheckIndex(mapEntity.Id);
        _logger.SerilogInformation("Entity removed.");
        await _repositoryBase.Remove(mapEntity);
    }
    public async Task EntityRemoveById(int Id)
    {
        await CheckIndex(Id);
        _logger.SerilogInformation("Entity removed.");
        await _repositoryBase.Remove(Id);
    }
    public async Task EntityUpdateByNewEntity(UpdateDto entity)
    {
        await CheckIndex(entity.Id);
        _logger.SerilogInformation("Entity updated.");
        await _repositoryBase.Update(_mapper.Map<Dto>(entity));
    }
    public async Task<PaginationMetaData<GetDto>> GetEntitiesPagination(PaginationUI paginationUI)
    {
        var repos = await _repositoryBase.GetEntities(paginationUI);
        if (repos.Entities.Count <= 0) throw new PaginationException();
        _logger.SerilogInformation("All entities displayed.");
        return new PaginationMetaData<GetDto>(_mapper.Map<List<GetDto>>(repos.Entities),
        repos.PageTotal, repos.TotalItem);
    }
    public async Task<IEnumerable<GetDto>> GetEntitiesValue()
    {
        var response = await _repositoryBase.GetValues();
        _logger.SerilogInformation("All entities displayed.");
        var mapEntities = _mapper.Map<List<GetDto>>(response);
        return mapEntities;
    }
    public async Task<GetDto> GetEntityById(int Id)
    {
        await CheckIndex(Id);
        var response = await _repositoryBase.GetValue(Id);
        _logger.SerilogInformation($"Entity with {Id} Id displayed");
        return _mapper.Map<GetDto>(response);
    }
}
