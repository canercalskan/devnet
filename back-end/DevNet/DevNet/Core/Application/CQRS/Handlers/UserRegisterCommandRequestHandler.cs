using DevNet.Core.Application.CQRS.Commands;
using DevNet.Core.Application.Enums;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;

namespace DevNet.Core.Application.CQRS.Handlers
{
    public class UserRegisterCommandRequestHandler : IRequestHandler<UserRegisterCommandRequest, Unit>
    {
        private readonly IRepository<User> userRepo;

        public UserRegisterCommandRequestHandler(IRepository<User> userRepo)
        {
            this.userRepo = userRepo;
        }

        public async Task<Unit> Handle(UserRegisterCommandRequest request, CancellationToken cancellationToken)
        {
            User user = new()
            {
                Id = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Gender = request.Gender,
                Age = request.Age,
                Country = request.Country,
                UserRoleId = (int)RoleType.Member
            };

            await userRepo.CreateAsync(user);

            return Unit.Value;
        }
    }
}
