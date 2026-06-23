using Portfolio.Api.Entities;

namespace Portfolio.Api.DTO
{
    public class RegisterationDTO
    {
        public byte[] Image;
        public string Name { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
        public List<string> Skills { get; set; }
        public List<Projects> Projects { get; set; }
        public List<Contacts> Contacts { get; set; }

    }
}
