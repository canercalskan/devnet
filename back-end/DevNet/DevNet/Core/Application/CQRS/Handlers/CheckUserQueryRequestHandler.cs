using DevNet.Core.Application.CQRS.Queries;
using DevNet.Core.Application.DTOs;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;

namespace DevNet.Core.Application.CQRS.Handlers
{
    public class CheckUserQueryRequestHandler : IRequestHandler<CheckUserQueryRequest, CheckUserResponseDto>
    {
        private readonly IRepository<User> userRepository;

        public CheckUserQueryRequestHandler(IRepository<User> userRepository)
        {
            this.userRepository = userRepository;          
        }

        public async Task<CheckUserResponseDto> Handle(CheckUserQueryRequest request, CancellationToken cancellationToken)
        {

            var dto = new CheckUserResponseDto();

            var user = await userRepository.GetByFilterAsync(x => x.Email == request.Email);

            var checkPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);

            if (checkPassword == false)
            {
                dto.IsExist = false;
                return dto;
            }

            dto.Email = user.Email;
            dto.Id = user.Id;
            dto.IsExist = true;
         
            return dto;
        }
    }
}
