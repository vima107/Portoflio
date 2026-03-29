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

        public List<Description> Description { get; set; }
    }
}
