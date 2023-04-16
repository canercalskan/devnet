using DevNet.Core.Application.CQRS.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DevNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : Controller
    {
        private readonly IMediator mediator;
        public CommentController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [Authorize]
        [HttpPost("PostComment")]
        public async Task<IActionResult> PostComment([FromBody]PostCommentCommandRequest request)
        {
            request.UserMail = User.FindFirst(ClaimTypes.Email)?.Value;

            await mediator.Send(request);
            return Ok();
        }
    }
}
