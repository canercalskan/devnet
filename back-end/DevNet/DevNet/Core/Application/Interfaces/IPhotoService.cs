using CloudinaryDotNet.Actions;

namespace DevNet.Core.Application.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    }
}
