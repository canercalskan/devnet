using DevNet.Core.Application.DTOs;
using DevNet.Core.Models;
using MediatR;

namespace DevNet.Core.Application.CQRS.Commands
{
    public class CreatePostCommandRequest : IRequest
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string AuthorMail { get; set; }
        public User Author { get; set; }
        public List<CommentDto> Comments { get; set; }
        public List<IFormFile> UploadPhotos { get; set; } = new List<IFormFile>();
        public List<PhotoDto> Photos { get; set; }
    }
}
