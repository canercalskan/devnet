using AutoMapper;
using DevNet.Core.Application.CQRS.Queries;
using DevNet.Core.Application.DTOs;
using DevNet.Core.Application.Interfaces;
using DevNet.Core.Models;
using MediatR;
using Microsoft.Extensions.Hosting;

namespace DevNet.Core.Application.CQRS.Handlers
{
    public class GetAllPostsQueryRequestHandler : IRequestHandler<GetAllPostsQueryRequest,List<PostDto>>
    {
        private readonly IRepository<Post> postRepository;
        private readonly IMapper _mapper;
        public GetAllPostsQueryRequestHandler(IRepository<Post> postRepository, IMapper mapper)
        {
            this.postRepository = postRepository;
            _mapper = mapper;
        }
        public async Task <List<PostDto>> Handle(GetAllPostsQueryRequest request, CancellationToken cancellationToken)
        {
            return _mapper.Map<List<PostDto>>(await this.postRepository.GetAllAsync());                       
        }
    }
}
