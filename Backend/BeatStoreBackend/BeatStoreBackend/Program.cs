using Microsoft.AspNetCore.HttpOverrides;

using BeatStoreBackend.Extensions;
using AspNetCoreRateLimit;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

//CORS Configuration
builder.Services.ConfigureCORS();

builder.Services.AddMemoryCache();
builder.Services.ConfigureRateLimiter();
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication();

builder.Services.AddAuthorization();

builder.Services.ConfigureSQLContext(configuration);

builder.Services.ConfigureRepositoryManager();

builder.Services.ConfigureCustomServices(configuration);

builder.Services.ConfigureIdentity();
builder.Services.ConfigureJWT(configuration);


builder.Services.AddControllers();

builder.Services.ConfigureAutoMapper();

var app = builder.Build();

app.ConfigureExceptionHandler();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseIpRateLimiting();

app.UseRouting();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.UseStaticFiles();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.All
});

app.MapControllers();

app.MigrateDatabase();

app.Run();
