using DevNet.Core.Application.CQRS.Commands;
using DevNet.Core.Application.CQRS.Queries;
using DevNet.Core.Application.Interfaces;
using DevNet.JWTTokenService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DevNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IMediator mediator;
        public ITokenService _tokenService;

        public AuthController(IMediator mediator, ITokenService tokenService)
        {
            this.mediator = mediator;
            _tokenService = tokenService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisterCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(CheckUserQueryRequest request)
        {

            var dto = await mediator.Send(request);

            if (dto.IsExist)
            {

                return Created("", _tokenService.GenerateToken(dto));
            }


            return BadRequest("Kullanıcı adı veya şifre hatalı");
        }
    }
}
