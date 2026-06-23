using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTO;
using Portfolio.Api.DatabaseContext;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("/portfolio/[controller]")]
    public class AdminLogin : ControllerBase
    {
        private readonly DBContext _dbContext;
        public AdminLogin(DBContext dBContext)
        {
            _dbContext = dBContext;
        }

        [HttpPost]
        public IActionResult verifyUser([FromBody] LoginDTO loginDTO)
        {
            var user = _dbContext.Users.FirstOrDefault(u=> u.Name == loginDTO.Username && u.Password == loginDTO.Password);
            if(user != null)
            {
                return Ok(new { messege = "Login successful"});
            }
            return Unauthorized(new { messege = "Invalid username or password" });
        }
    }
}
