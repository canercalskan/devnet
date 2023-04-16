using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevNet.Core.Models
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
        [ForeignKey("PostId")]
        public Guid PostId { get; set; } 
    }
}
