using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;

namespace Worker.Core.Services
{
    public interface ITagRoleService
    {
        Task<List<TagRole>> GetAllAsync();
        Task<TagRole> GetByIdAsync(int id);
        Task<TagRole> UpdateAsync(TagRole tagRole);
        Task DeleteAsync(int id);
        Task<TagRole> AddAsync(TagRole tagRole);
    }
}
