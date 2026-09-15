using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.DatabaseContext;
using Portfolio.Api.DTO;
using Portfolio.Api.Entities;
using Portfolio.Api.NewFolder;

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
                if (registerationDTO.Id>0)
                {
                    var existingUser = await _dbContext.Users.FindAsync(registerationDTO.Id);
                    if (existingUser != null)
                    {
                        existingUser.Name = registerationDTO.Name;
                        existingUser.JobRole = registerationDTO.JobRole;

                        if (!string.IsNullOrEmpty(registerationDTO.Password))
                            existingUser.Password = BCrypt.Net.BCrypt.HashPassword(registerationDTO.Password);

                        if (registerationDTO.Image != null)
                        {
                            using var ms = new MemoryStream();
                            await registerationDTO.Image.CopyToAsync(ms);
                            existingUser.Image = ms.ToArray();
                        }

                        if (registerationDTO.Resume != null)
                        {
                            using var ms = new MemoryStream();
                            await registerationDTO.Resume.CopyToAsync(ms);
                            existingUser.Resume = ms.ToArray();
                        }

                        // Delete existing skills, projects, contacts
                        var existingSkills = _dbContext.Skills.Where(s => s.UserId == existingUser.Id);
                        _dbContext.Skills.RemoveRange(existingSkills);

                        var existingProjects = _dbContext.Projects.Where(p => p.UserId == existingUser.Id);
                        _dbContext.Projects.RemoveRange(existingProjects);

                        var existingContacts = _dbContext.Contact.Where(c => c.UserId == existingUser.Id);
                        _dbContext.Contact.RemoveRange(existingContacts);

                        var existingDescription = _dbContext.Description.Where(d => d.UserId == existingUser.Id);
                        _dbContext.Description.RemoveRange(existingDescription);

                        // Re-insert new ones
                        foreach (var skill in registerationDTO.Skills)
                        {
                            _dbContext.Skills.Add(new Skills { Skill = skill, UserId = existingUser.Id });
                        }

                        foreach (var project in registerationDTO.Projects)
                        {
                            _dbContext.Projects.Add(new Projects { Title = project.Title, Description = project.Description, UserId = existingUser.Id });
                        }

                        foreach (var contact in registerationDTO.Contacts)
                        {
                            _dbContext.Contact.Add(new Contacts { ContactType = contact.ContactType, ContactValue = contact.ContactValue, UserId = existingUser.Id });
                        }

                        _dbContext.Description.Add(new Description { Descripition = registerationDTO.Description, UserId = existingUser.Id });

                        await _dbContext.SaveChangesAsync();
                        return Ok(new { message = "Updated successfully" });
                    }
                }

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
                    JobRole = registerationDTO.JobRole,
                    Role = UserTypeEnum.UserType.User.ToString(),
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
