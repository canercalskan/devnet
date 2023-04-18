using DevNet.Core.Application.CQRS.Commands;
using DevNet.Core.Application.CQRS.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DevNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IMediator mediator;
        public PostController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [Authorize]
        [HttpPost("CreatePost")]
        public async Task<IActionResult> CreatePost([FromForm] CreatePostCommandRequest request)
        {
            request.AuthorMail = User.FindFirst(ClaimTypes.Email)?.Value;

            await mediator.Send(request);
            return Ok();
        }
        [AllowAnonymous]
        [HttpPost("GetAllPosts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var allPosts = await mediator.Send(new GetAllPostsQueryRequest());
            return Ok(allPosts);
        }

        [Authorize]
        [HttpPost("LikePost")]
        public async Task<IActionResult> LikePost(LikePostCommandRequest request)
        {
            request.UserMail = User.FindFirst(ClaimTypes.Email)?.Value;

            await mediator.Send(request);
            return Ok();
        }
    }
}
