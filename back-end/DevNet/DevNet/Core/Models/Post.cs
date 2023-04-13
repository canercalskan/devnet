using System.ComponentModel.DataAnnotations;

namespace DevNet.Core.Models
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string AuthorFirstName { get; set; }
        public string AuthorLastName { get; set; }
        public string AuthorId { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public List <string> Photos { get; set; }
    }
}
