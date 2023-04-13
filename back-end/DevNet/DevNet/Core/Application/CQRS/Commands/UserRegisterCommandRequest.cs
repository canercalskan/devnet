using MediatR;
using System.ComponentModel.DataAnnotations;

namespace DevNet.Core.Application.CQRS.Commands
{
    public class UserRegisterCommandRequest : IRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Country { get; set; }
    }
}
