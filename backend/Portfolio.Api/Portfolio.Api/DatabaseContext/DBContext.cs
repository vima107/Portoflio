using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Entities;
namespace Portfolio.Api.DatabaseContext;

public class DBContext : DbContext
{
    public DBContext(DbContextOptions<DBContext> options) : base(options)
    {

    }
    public DbSet<Users> Users { get; set; }
    public DbSet<Description> Description { get; set; }
    public DbSet<Skills> Skills { get; set; }
    public DbSet<Projects> Projects { get; set; }
    public DbSet<Contacts> Contact { get; set; }

}
