using DevNet.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace DevNet.Core.Application.DTOs
{
    public class UserDto
    {             
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public List <Post> Posts { get; set; }
        
    }
}
