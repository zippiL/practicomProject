using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using worker.API.Models;
using Worker.Core.DTOs;
using Worker.Core.Models;
using Worker.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace worker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmlpyeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employee = await _employeeService.GetAllAsync();
            
            var employeeDto = _mapper.Map<IEnumerable<EmployeeDto>>(employee);
            return Ok(employeeDto);
        }


        // GET api/<EmlpyeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }


        // POST api/<EmlpyeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel value)
        {
            var employee = await _employeeService.AddAsync(_mapper.Map<Employee>(value));
            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }


        // PUT api/<EmlpyeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel value)
        {

            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            _mapper.Map(value, employee);
            return Ok(_mapper.Map<EmployeeDto>(await _employeeService.
                UpdateAsync(_mapper.Map<Employee>(employee))));
        }

        // DELETE api/<EmlpyeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _employeeService.DeleteAsync(id);
            return NoContent();

        }
    }
}
