using DevNet.Core.Application.DTOs;
using MediatR;

namespace DevNet.Core.Application.CQRS.Queries
{
    public class CheckUserQueryRequest : IRequest<CheckUserResponseDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
