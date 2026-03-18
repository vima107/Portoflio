using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTO;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("/portfolio[controller]")]
    public class AdminLogin : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<LoginDTO>> verifyUser()
        {
            if (LoginDTO.Equals("admin", "admin"))
            {
                return Ok("Login successful");
            }
            return Unauthorized("Invalid username or password");

        }
    }
}
