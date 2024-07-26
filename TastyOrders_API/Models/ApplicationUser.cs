using Microsoft.AspNetCore.Identity;

namespace TastyOrders_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
