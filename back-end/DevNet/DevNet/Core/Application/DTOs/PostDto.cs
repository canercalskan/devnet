﻿using DevNet.Core.Models;

namespace DevNet.Core.Application.DTOs
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string AuthorFirstName { get; set; }
        public string AuthorLastName { get; set; }
        public string AuthorId { get; set; }
        public List<string> Photos { get; set; }
        public long LikesCount { get; set; }
        public ICollection<LikeDto> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
