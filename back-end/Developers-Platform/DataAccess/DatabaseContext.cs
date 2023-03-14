using Developers_Platform.Models;
using Microsoft.EntityFrameworkCore;


namespace Developers_Platform.DataAccess
{
    public class DatabaseContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=UsersDB;Trusted_Connection=true");
        }
        public DbSet<User> Users { get; set; }
    }
}
