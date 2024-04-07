using Worker.Core.Models;

namespace worker.API.Models
{
    public class RolePostModel
    {
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }
        //public string Name { get; set; }
        public int TagRoleId { get; set; }
    }
}
