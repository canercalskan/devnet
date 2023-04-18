using DevNet.Core.Application.CQRS.Commands;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;
using static System.Net.Mime.MediaTypeNames;

namespace DevNet.Core.Application.CQRS.Handlers
{
    public class PostCommentCommandRequestHandler : IRequestHandler<PostCommentCommandRequest, Unit>
    {
        private readonly IRepository<Post> postRepo;
        private readonly IRepository<Comment> commentRepo;
        private readonly IRepository<User> userRepo;

        public PostCommentCommandRequestHandler(IRepository<Post> postRepo, IRepository<Comment> commentRepo, IRepository<User> userRepo)
        {
            this.postRepo = postRepo;
            this.commentRepo = commentRepo;
            this.userRepo = userRepo;

        }

        public async Task<Unit> Handle(PostCommentCommandRequest request, CancellationToken cancellationToken)
        {
            Post Post = await postRepo.GetPost(request.PostId);
            var User = await userRepo.GetByFilterAsync(x => x.Email == request.UserMail);
                       
            Comment comment = new()
            {
                Id = Guid.NewGuid(),
                Text = request.CommentText,
                Time = DateTime.UtcNow,
                UserId = User.Id,
                PostId = Post.Id,
            };
            
            await commentRepo.CreateAsync(comment);
            Post.Comments.Add(comment);
            await postRepo.UpdateAsync(Post);

            return Unit.Value;

        }
    }
}
