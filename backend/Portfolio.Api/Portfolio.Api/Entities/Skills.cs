using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities
{
    [Table("skills")]
    public class Skills
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("userid")]
        public int UserId { get; set; }
        [Column("skills")]
        public string Skill { get; set; }
        [ForeignKey("UserId")]
        public Users? User { get; set; }
    }
}
