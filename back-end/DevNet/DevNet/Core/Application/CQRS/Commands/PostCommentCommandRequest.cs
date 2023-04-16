using MediatR;

namespace DevNet.Core.Application.CQRS.Commands
{
    public class PostCommentCommandRequest : IRequest
    {
        public Guid PostId { get; set; }
        public string CommentText { get; set; }
        public string UserMail { get; set; }
    }
}
