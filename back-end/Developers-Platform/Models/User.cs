﻿using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace Developers_Platform.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;  
        public int Age { get; set; } = 0;
        public string Country { get; set; } = string.Empty;
    }
}