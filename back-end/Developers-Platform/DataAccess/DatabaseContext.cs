using Developers_Platform.Models;
using Microsoft.EntityFrameworkCore;


namespace Developers_Platform.DataAccess
{
    public class DatabaseContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"Server=91.107.194.181;Port=5432;Database=postgres;User Id=postgres;Password=Ukebu1riz_gl;");
        }
        public DbSet<User> Users { get; set; }
    }
}
