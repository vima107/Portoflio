using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTO;
using Portfolio.Api.DatabaseContext;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> verifyUser([FromBody] LoginDTO loginDTO)
        {
            var user = _dbContext.Users.FirstOrDefault(u=> u.Name == loginDTO.Username);
            if(user != null)
            {
                 var userDetails = await _dbContext.Users
                        .Include(u => u.Description)
                        .Include(u => u.Skills)
                        .Include(u => u.Projects)
                        .Include(u => u.Contacts)
                        .FirstOrDefaultAsync(u => u.Name == loginDTO.Username);
                return Ok(new
                {
                    userDetails.Id,
                    userDetails.Name,
                    userDetails.Image,
                    userDetails.Resume,
                    userDetails.JobRole,
                    userDetails.PortfolioUrl,
                    userDetails.Description,
                    userDetails.Skills,
                    userDetails.Projects,
                    userDetails.Contacts
                });
            }
            return Unauthorized(new { messege = "Invalid username or password" });
        }
    }
}
