﻿using AutoMapper;
using DevNet.Core.Application.DTOs;
using DevNet.Core.Models;

namespace DevNet.Core.Application.AutoMapper
{
    public class PostMap:Profile
    {
        public PostMap()
        {
            CreateMap<Like, LikeDto>().ReverseMap();
            CreateMap<Post, PostDto>().ReverseMap();
        }
    }
}
