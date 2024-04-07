using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using worker.API.Models;
using Worker.Core.DTOs;
using Worker.Core.Models;
using Worker.Core.Services;
using Worker.Data.Migrations;
using Worker.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace worker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagRoleController : ControllerBase
    {
        private readonly ITagRoleService _tagRoleService;
        private readonly IMapper _mapper;
        public TagRoleController(ITagRoleService tagRoleService,IMapper mapper)
        {
            _tagRoleService = tagRoleService;
            _mapper = mapper;
        }
        // GET: api/<TagRoleController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var tagRoles = await _tagRoleService.GetAllAsync();
            var tagRoleDto = _mapper.Map<IEnumerable<TagRoleDto>>(tagRoles);


            return Ok(tagRoleDto);
        }

        // GET api/<TagRoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var tagRole = await _tagRoleService.GetByIdAsync(id);
            var tagRoleDto = _mapper.Map<IEnumerable<TagRoleDto>>(tagRole);

            return Ok(tagRoleDto);
        }

        // POST api/<TagRoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TagRolePostModel value)
        {
            var tagRole = await _tagRoleService.AddAsync(_mapper.Map<TagRole>(value));
            var tagRoleDto = _mapper.Map<TagRoleDto>(tagRole);

            return Ok(tagRoleDto);
        }

        // PUT api/<TagRoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] TagRolePostModel value)
        {
            var tagRole = await _tagRoleService.GetByIdAsync(id);
            if (tagRole is null)
            {
                return NotFound();
            }
            _mapper.Map(value, tagRole);
            return Ok(_mapper.Map<TagRoleDto>(await _tagRoleService.
                UpdateAsync(_mapper.Map<TagRole>(tagRole))));
        }

        // DELETE api/<TagRoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _tagRoleService.DeleteAsync(id);
            return NoContent();

        }
    }
}
