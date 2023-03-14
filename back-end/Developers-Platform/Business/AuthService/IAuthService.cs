using Developers_Platform.Models;

namespace Developers_Platform.Business.AuthService
{
    public interface IAuthService
    {
        Task SignUp(User user);
        public bool EmailChecker(string Email);
        public string Login(UserForLoginDto userForLoginDto);
    }
}
