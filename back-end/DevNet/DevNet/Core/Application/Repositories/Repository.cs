using DevNet.Core.Application.Interfaces;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using DevNet.Context;
using DevNet.Core.Models;

namespace DevNet.Core.Application.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, new()
    {
        private readonly DatabaseContext _context;
        private readonly DbSet<T> dbset;
        public Repository(DatabaseContext context)
        {
            _context = context;
            dbset = _context.Set<T>();
        }


        public async Task CreateAsync(T entity)
        {
            await dbset.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task<List<T>> GetAllAsync()
        {
            return dbset.AsNoTracking().ToListAsync();
        }

        public async Task<T> GetByFilterAsync(Expression<Func<T, bool>> filter)
        {
            return await dbset.AsNoTracking().SingleOrDefaultAsync(filter);
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await dbset.FindAsync(id);
        }

        public async Task RemoveAsync(T entity)
        {
            dbset.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            dbset.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task<Post> GetPost(Guid postId)
        {
            return await _context.Posts.Include(p => p.Comments).Include(p=>p.Likes).FirstOrDefaultAsync(x=>x.Id == postId);
        }
        public async Task<List<Post>> GetAllPostsWithCommentsAsync()
        {
            return await _context.Posts.Include(p => p.Comments).Include(p=>p.Likes).ToListAsync();
        }
        public async Task<List<Post>> GetUserPosts(string userId)
        {
            return await _context.Posts.Include(p => p.Comments).Include(p => p.Likes).Where(x=>x.AuthorId == userId).ToListAsync();
        }
    }
}
