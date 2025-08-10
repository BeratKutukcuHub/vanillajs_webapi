
using Store.API.StoreApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.LayeredService();
builder.Services.ConfigurationBuilderService();


var app = builder.Build();
app.UseHttpsRedirection();
app.MiddlewareService();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ConfigurationAppService();
app.MapControllers();
app.Run();

