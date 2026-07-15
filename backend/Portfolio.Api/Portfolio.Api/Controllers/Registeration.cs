using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DatabaseContext;
using Portfolio.Api.DTO;
using Portfolio.Api.Entities;

namespace Portfolio.Api.Controllers
{
    [ApiController]
    [Route("/portfolio/[controller]")]
    public class Registeration : ControllerBase
    {
        private readonly DBContext _dbContext;
        public Registeration(DBContext dBContext)
        {
            _dbContext = dBContext;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromForm] RegisterationDTO registerationDTO)
        {
            if (registerationDTO != null)
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerationDTO.Password);
                var uniqueSlug = Guid.NewGuid().ToString("N")[..8];
                byte[] image = null;

                if (registerationDTO.Image != null)
                {
                    using (var ms = new MemoryStream())
                    {
                        await registerationDTO.Image.CopyToAsync(ms);
                        image = ms.ToArray();
                    }
                }

                byte[] resume = null;
                if(registerationDTO.Resume != null)
                {
                    using (var ms = new MemoryStream())
                    {
                        await registerationDTO.Resume.CopyToAsync(ms);
                        resume = ms.ToArray();
                    }
                }
                var user = new Users
                {
                    Name = registerationDTO.Name,
                    Password = hashedPassword,
                    Image = image,
                    Resume = resume,
                    PortfolioUrl = uniqueSlug
                };
                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();

                var description = new Description
                {
                    Descripition = registerationDTO.Description,
                    UserId = user.Id,
                };
                _dbContext.Description.Add(description);
                foreach (string s in registerationDTO.Skills)
                {
                    var skill = new Skills
                    {
                        UserId = user.Id,
                        Skill = s
                    };
                    _dbContext.Skills.Add(skill);
                }

                foreach (var pT in registerationDTO.Projects)
                {
                    var project = new Projects
                    {
                        UserId = user.Id,
                        Title = pT.Title,
                        Description = pT.Description,
                    };
                    _dbContext.Projects.Add(project);
                }

                foreach (var c in registerationDTO.Contacts)
                {
                    var contact = new Contacts
                    {
                        UserId = user.Id,
                        ContactType = c.ContactType,
                        ContactValue = c.ContactValue,
                    };
                    _dbContext.Contact.Add(contact);
                }
                await _dbContext.SaveChangesAsync();
            }
            return Ok(new { message = "Registration successful" });
        }
    }
}
