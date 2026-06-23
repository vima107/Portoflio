using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Portfolio.Api.Entities
{
    [Table("contacts")]
    public class Contacts
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("userid")]
        public int UserId { get; set; }
        [Column("contactType")]
        public string ContactType { get; set; }
        [Column("contactValue")]
        public string ContactValue { get; set; }
        [ForeignKey("UserId")]
        public Users? User { get; set; }
    }
}
