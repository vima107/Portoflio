using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Entities;
namespace Portfolio.Api.DatabaseContext;

public class DBContext : DbContext
{
    public DBContext(DbContextOptions<DBContext> options) : base(options)
    {

    }
    public DbSet<Users> Users { get; set; }
}
