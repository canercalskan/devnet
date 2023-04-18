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
        private readonly IPhotoService photoService;

        public LikePostCommandRequestHandler(IRepository<Like> likeRepo, IRepository<Post> postRepo, IRepository<User> userRepository, IPhotoService photoService)
        {
            this.likeRepo = likeRepo;
            this.postRepo = postRepo;
            this.userRepository = userRepository;
            this.photoService = photoService;
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
            Post.Likes.Add(like);
            await postRepo.UpdateAsync(Post);


            return Unit.Value;
        }
    }
}
