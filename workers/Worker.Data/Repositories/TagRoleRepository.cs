using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;
using Worker.Core.Repositories;

namespace Worker.Data.Repositories
{
    public class TagRoleRepository:ITagRoleRepository
    {
        private readonly DataContext _context;
        public TagRoleRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<List<TagRole>> GetAllAsync()
        {
            return await _context.TagRoles.ToListAsync();
        }

        public async Task<TagRole> GetByIdAsync(int id)
        {
            return await _context.TagRoles.FirstOrDefaultAsync(x => x.Id == id );
        }


        public async Task<TagRole> UpdateAsync(TagRole tagRole)
        {
            var existTagRole = await GetByIdAsync(tagRole.Id);
            _context.Entry(existTagRole).CurrentValues.SetValues(tagRole);


            await _context.SaveChangesAsync();
            return existTagRole;
        }
       

        public async Task DeleteAsync(int id)
        {
            var existTagRole = await GetByIdAsync(id);
            if (existTagRole != null)
            {
                _context.TagRoles.Remove(existTagRole);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<TagRole> AddAsync(TagRole tagRole)
        {
            _context.TagRoles.Add(tagRole);
            await _context.SaveChangesAsync();
            return tagRole;
        }

    }
}

