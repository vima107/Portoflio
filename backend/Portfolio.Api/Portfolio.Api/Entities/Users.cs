using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities
{
    [Table("users")]
    public class Users
    {
        
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("image")]
        public byte[] Image { get; set; }
        [Column("resume")]
        public byte[] Resume { get; set; }
        [Column("portfoliourl")]
        public string PortfolioUrl { get; set; }

        public List<Description> Description { get; set; }
        public List<Skills> Skills { get; set; }
        public List<Projects> Projects { get; set; }
        public List<Contacts> Contacts { get; set; }
    }
}
