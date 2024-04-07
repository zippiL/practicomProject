using worker.API.Mapping;
using Worker.Core.DTOs;
using Worker.Core.mapping;
using Worker.Core.Repositories;
using Worker.Core.Services;
using Worker.Data;
using Worker.Data.Repositories;
using Worker.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<ITagRoleService, TagRoleService>();
//builder.Services.AddScoped<IRoleService, RoleService>();


builder.Services.AddScoped<IEmployeeRepository,EmployeeRepository>();
builder.Services.AddScoped<ITagRoleRepository,TagRoleRepository>();
//builder.Services.AddScoped<IRoleRepository, RoleRepository>();

builder.Services.AddDbContext<DataContext>();
builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(PostModelsMappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(); 

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
