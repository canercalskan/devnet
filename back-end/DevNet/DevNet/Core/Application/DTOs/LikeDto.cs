using DevNet.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevNet.Core.Application.DTOs
{
    public class LikeDto
    {
        public Guid Id { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
    }
}
