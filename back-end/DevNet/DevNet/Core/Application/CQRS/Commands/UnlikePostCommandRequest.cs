using MediatR;

namespace DevNet.Core.Application.CQRS.Commands
{
    public class UnlikePostCommandRequest : IRequest
    {
        public Guid PostId { get; set; }
        public string UserMail { get; set; }
    }
}
