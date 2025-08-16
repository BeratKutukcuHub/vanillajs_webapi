
using Store.API.StoreApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.SerilogService();
builder.Services.LayeredService();
builder.Services.ConfigurationBuilderService(builder.Configuration);


var app = builder.Build();
app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MiddlewareService();
app.ConfigurationAppService();
app.MapControllers();
app.Run();

