using AutoMapper;
using DevNet.Core.Application.CQRS.Queries;
using DevNet.Core.Application.DTOs;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;

namespace DevNet.Core.Application.CQRS.Handlers
{
    public class GetLoggedInUserProfileInfoQueryRequestHandler : IRequestHandler<GetLoggedInUserProfileInfoQueryRequest, UserDto>
    {
        private readonly IRepository<User> userRepository;
        private readonly IRepository<Post> postRepository;
        public GetLoggedInUserProfileInfoQueryRequestHandler(IRepository<User> userRepository, IRepository<Post> postRepository) 
        {
            this.userRepository = userRepository;
            this.postRepository = postRepository;        
        }

        public async Task <UserDto> Handle(GetLoggedInUserProfileInfoQueryRequest request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByFilterAsync(x => x.Email == request.UserMail);
            var userPosts = await postRepository.GetUserPosts(user.Id);
            UserDto userDto = new()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Posts = userPosts,
             };
            return userDto;
        }
    }
}
