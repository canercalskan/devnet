using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace DevNet.Controllers
{
    public class PostController : Controller
    {
        [Authorize]
        [HttpPost("Test")]
        public IActionResult Index()
        {
            return Ok("Test");
        }
    }
}
