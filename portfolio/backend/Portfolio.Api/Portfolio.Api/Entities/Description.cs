using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities
{
    [Table("description")]
    public class Description
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("description")]
        public string Descripiton { get; set; }
        [Column("userid")]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; }
    }
}
