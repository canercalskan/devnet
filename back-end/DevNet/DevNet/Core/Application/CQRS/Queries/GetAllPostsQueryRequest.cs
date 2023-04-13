using DevNet.Core.Application.DTOs;
using MediatR;

namespace DevNet.Core.Application.CQRS.Queries
{
    public class GetAllPostsQueryRequest : IRequest <List<PostDto>>
    {
    }
}
