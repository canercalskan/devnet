using DevNet.Core.Application.CQRS.Commands;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;

namespace DevNet.Core.Application.CQRS.Handlers
{
    public class CreatePostCommandRequestHandler : IRequestHandler<CreatePostCommandRequest, Unit>
    {
        private readonly IRepository<Post> postRepo;
        private readonly IRepository<User> userRepository;
        private readonly IPhotoService photoService;

        public CreatePostCommandRequestHandler(IRepository<Post> postRepo, IRepository<User> userRepository, IPhotoService photoService)
        {
            this.postRepo = postRepo;
            this.userRepository = userRepository;
            this.photoService = photoService;
        }

        public async Task<Unit> Handle(CreatePostCommandRequest request, CancellationToken cancellationToken)
        {
            var Author = await userRepository.GetByFilterAsync(x => x.Email == request.AuthorMail);
            var uploadedPhotos = new List<string>();
            foreach (var photo in request.UploadPhotos)
            {            
                    var photoResult = await photoService.AddPhotoAsync(photo);                            
                    uploadedPhotos.Add(photoResult.SecureUrl.AbsoluteUri);
            }
            Post post = new()
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Text = request.Text,
                CreatedAt = DateTime.UtcNow,
                AuthorFirstName = Author.FirstName,
                AuthorLastName = Author.LastName,
                AuthorId = Author.Id,
                Likes = new List<Like>(),
                Comments = new List<Comment>(),            
                Photos = uploadedPhotos
            };

            await postRepo.CreateAsync(post);

            return Unit.Value;
        }
    }
}
