﻿using Microsoft.AspNetCore.Identity;

namespace Developers_Platform.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Country { get; set; }
    }
}
