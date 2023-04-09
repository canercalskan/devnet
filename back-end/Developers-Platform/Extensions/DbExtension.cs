using Developers_Platform.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace Developers_Platform.Extensions
{
    public static class DbExtension
    {
        public static void SeedDb(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<DatabaseContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }
        }
    }
}
