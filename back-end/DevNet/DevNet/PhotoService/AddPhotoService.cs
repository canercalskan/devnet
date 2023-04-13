using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DevNet.Core.Application.Interfaces;
using System.Security.Principal;

namespace DevNet.PhotoService
{
    public class AddPhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public AddPhotoService()
        {
            var CLOUDINARY_URL = "cloudinary://145946491378113:HlauPZ1c5MPGAWqc5w7zSFSOdF4@dycnowlr0";

            var data = CLOUDINARY_URL.Split("://")[1];
            var apiKey = data.Split(":")[0];
            var apiSecret = (data.Split(':')[1]).Split('@')[0];
            var cloudName = data.Split('@')[1];
            var acc = new Account(apiKey: apiKey, apiSecret: apiSecret, cloud: cloudName);
            _cloudinary = new Cloudinary(account: acc);
        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            int quality = 50;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Quality(quality)
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }
    }
}
