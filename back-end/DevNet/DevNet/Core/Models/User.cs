using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DevNet.Core.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Country { get; set; }
        public int UserRoleId { get; set; }
    }
}
