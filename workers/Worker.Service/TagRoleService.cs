using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;
using Worker.Core.Repositories;
using Worker.Core.Services;

namespace Worker.Service
{
    public class TagRoleService : ITagRoleService
    {
        private readonly ITagRoleRepository _tagRoleRepository;
        public TagRoleService(ITagRoleRepository tagRoleRepository)
        {
            _tagRoleRepository = tagRoleRepository;
        }
        public async Task<TagRole> AddAsync(TagRole tagRole)
        {
            return await _tagRoleRepository.AddAsync(tagRole);
        }

        public async Task DeleteAsync(int id)
        {
             await _tagRoleRepository.DeleteAsync(id);
        }

        public Task<List<TagRole>> GetAllAsync()
        {
            return _tagRoleRepository.GetAllAsync();
        }

        public async Task<TagRole> GetByIdAsync(int id)
        {
            return await _tagRoleRepository.GetByIdAsync(id);
        }

        public async Task<TagRole> UpdateAsync(TagRole tagRole)
        {
            return await _tagRoleRepository.UpdateAsync(tagRole);
        }
    }
}
