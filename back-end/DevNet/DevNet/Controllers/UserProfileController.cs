using DevNet.Core.Application.CQRS.Queries;
using DevNet.Core.Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DevNet.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private readonly IMediator mediator;

        public UserProfileController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [Authorize]
        [HttpPost("GetLoggedInUserProfileInfo")]
        public async Task<IActionResult> GetLoggedInUserProfileInfo()
        {
            var userMail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(userMail))
            {
                return BadRequest("Kullanıcı Profili Bulunamadı.");
            }

            var request = new GetLoggedInUserProfileInfoQueryRequest { UserMail = userMail };
            var userProfileInfo = await mediator.Send(request);

            if (userProfileInfo != null)
            {
                return Ok(userProfileInfo);
            }
            return BadRequest("Kullanıcı Profili Bulunamadı.");
        }

    }
}
