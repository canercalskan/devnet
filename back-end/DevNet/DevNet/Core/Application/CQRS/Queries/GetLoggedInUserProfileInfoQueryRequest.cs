using DevNet.Core.Application.DTOs;
using MediatR;

namespace DevNet.Core.Application.CQRS.Queries
{
    public class GetLoggedInUserProfileInfoQueryRequest : IRequest<UserDto>
    {
        public string UserMail { get; set; } = string.Empty;
    }
}
