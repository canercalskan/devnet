using Developers_Platform.Business.AuthService;
using Developers_Platform.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;

namespace Developers_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
      
        IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("login")]
        public ActionResult<User> Login(UserForLoginDto userForLoginDto)
        {
            if (_authService.Login == null)
            {
                return BadRequest("Wrong password.");
            }

            return Ok(_authService.Login(userForLoginDto));
        }

        [HttpPost("register")]
        public ActionResult<User> Register(User request)
        {
            try
            {
                if (_authService.EmailChecker(request.Email))
                {
                    return BadRequest("Email already exists.");
                }
                else
                {
                    _authService.SignUp(request);
                    return Ok("Success.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while checking the Email. {ex.Message}");
            }                                 
        }


    }
}
