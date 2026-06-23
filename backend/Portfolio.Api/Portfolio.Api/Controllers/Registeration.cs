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
        public IActionResult registerUser([FromBody] RegisterationDTO registerationDTO)
        {
            if (registerationDTO != null)
            {
                var user = new Users
                {
                    Name = registerationDTO.Name,
                    Password = registerationDTO.Password
                };
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();

                var description = new Description
                {
                    Descripiton = registerationDTO.Description,
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
                _dbContext.SaveChanges();
            }
            return Ok(new { message = "Registration successful" });
        }
    }
}
