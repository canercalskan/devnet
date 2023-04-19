using DevNet.Core.Application.CQRS.Commands;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;

namespace DevNet.Core.Application.CQRS.Handlers
{
    public class UnlikePostCommandRequestHandler:IRequestHandler<UnlikePostCommandRequest,Unit>
    {

        private readonly IRepository<Like> likeRepo;
        private readonly IRepository<Post> postRepo;
        private readonly IRepository<User> userRepository;

        public UnlikePostCommandRequestHandler(IRepository<Like> likeRepo, IRepository<Post> postRepo, IRepository<User> userRepository)
        {
            this.likeRepo = likeRepo;
            this.postRepo = postRepo;
            this.userRepository = userRepository;
        }

        public async Task<Unit> Handle(UnlikePostCommandRequest request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByFilterAsync(x => x.Email == request.UserMail);
            Post Post = await postRepo.GetPost(request.PostId);
            var userLike = Post.Likes.Where(p => p.UserId == user.Id).FirstOrDefault();

            if (userLike != null)
            {
                await likeRepo.RemoveAsync(userLike);
                Post.Likes.Remove(userLike);
                Post.LikesCount = Post.Likes.Count;
                await postRepo.UpdateAsync(Post);
            }
            return Unit.Value;
        }
    }
}
