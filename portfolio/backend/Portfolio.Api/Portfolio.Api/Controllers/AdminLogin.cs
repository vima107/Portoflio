using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTO;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("/portfolio[controller]")]
    public class AdminLogin : ControllerBase
    {
        [HttpPost]
        public ActionResult<IEnumerable<LoginDTO>> verifyUser([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO.Userame.Equals("VimalKumar") && loginDTO.Password.Equals("vima2002"))
            {
                return Ok("Login successful");
            }
            return Unauthorized("Invalid username or password");

        }
    }
}
