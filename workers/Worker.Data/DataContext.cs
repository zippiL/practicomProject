using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;

namespace Worker.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<TagRole> TagRoles { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-RVOHTK2;Database=workersS_db;TrustServerCertificate=true;trusted_connection=true;");        
            //optionsBuilder.UseSqlServer("Server=(localdb)\\ProjectModels;Database=sample_db");

        }

    }
}
