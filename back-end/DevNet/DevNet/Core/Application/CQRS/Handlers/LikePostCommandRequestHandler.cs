using DevNet.Core.Application.CQRS.Commands;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;
namespace DevNet.Core.Application.CQRS.Handlers
{
    public class LikePostCommandRequestHandler : IRequestHandler<LikePostCommandRequest, Unit>
    {
        private readonly IRepository<Like> likeRepo;
        private readonly IRepository<Post> postRepo;
        private readonly IRepository<User> userRepository;

        public LikePostCommandRequestHandler(IRepository<Like> likeRepo, IRepository<Post> postRepo, IRepository<User> userRepository)
        {
            this.likeRepo = likeRepo;
            this.postRepo = postRepo;
            this.userRepository = userRepository;
        }

        public async Task<Unit> Handle(LikePostCommandRequest request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByFilterAsync(x => x.Email == request.UserMail);
            Post Post = await postRepo.GetPost(request.PostId); 
            var isUserLiked = Post.Likes.Where(p => p.UserId == user.Id).FirstOrDefault();

            if (isUserLiked != null)
            {
                throw new Exception("Kullanici like atamaz");
            }
           
            Like like = new()
            {
                Id = Guid.NewGuid(),
                Time = DateTime.UtcNow,
                UserId = user.Id,
                PostId = request.PostId,
            };

            await likeRepo.CreateAsync(like);
            Post.LikesCount = Post.Likes.Count;
            Post.Likes.Add(like);
            await postRepo.UpdateAsync(Post);


            return Unit.Value;
        }
    }
}
