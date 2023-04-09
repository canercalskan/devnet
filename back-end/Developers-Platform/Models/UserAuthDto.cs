﻿namespace Developers_Platform.Models
{
    public class UserAuthDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
    }
}