using DevNet.Core.Models;
using System.Linq.Expressions;

namespace DevNet.Core.Application.Interfaces
{
    public interface IRepository<T> where T : class, new()
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> GetByFilterAsync(Expression<Func<T, bool>> filter);
        Task CreateAsync(T entity);
        Task UpdateAsync(T entity);
        Task RemoveAsync(T entity);
        Task<Post> GetPost(Guid postId);
        Task<List<Post>> GetAllPostsWithCommentsAsync();
        Task<List<Post>> GetUserPosts(string userId);
    }
}
