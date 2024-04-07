using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.DTOs;
using Worker.Core.Models;

namespace Worker.Core.mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee,EmployeeDto>().ReverseMap(); 
            CreateMap<TagRole,TagRoleDto>().ReverseMap(); 
            CreateMap<Role,RoleDto>().ReverseMap(); 
        }
    }
}
