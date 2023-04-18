using DevNet.Core.Application.CQRS.Handlers;
using MediatR;

namespace DevNet.Core.Application.CQRS.Commands
{
    public class LikePostCommandRequest : IRequest
    {
        public Guid PostId { get; set; }
        public string UserMail { get; set; }
    }
}
