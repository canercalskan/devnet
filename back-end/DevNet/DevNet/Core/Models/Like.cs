using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevNet.Core.Models
{
    public class Like
    {
        public Guid Id { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
        [ForeignKey("PostId")]
        public Guid PostId { get; set; }
        public Post Post { get; set; }
    }
}
