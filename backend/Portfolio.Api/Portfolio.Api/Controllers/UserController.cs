using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.DatabaseContext;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("/portfolio/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DBContext _dbContext;

        public UserController(DBContext dBContext)
        {
            _dbContext = dBContext;
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetUserDetails(string slug)
        {
            var user = await _dbContext.Users
                        .Include(u => u.Description)
                        .Include(u => u.Skills)
                        .Include(u => u.Projects)
                        .Include(u => u.Contacts)
                        .FirstOrDefaultAsync(u => u.PortfolioUrl == slug);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

    }
}
