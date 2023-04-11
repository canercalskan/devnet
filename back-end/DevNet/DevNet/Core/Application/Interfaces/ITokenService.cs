using DevNet.Core.Application.DTOs;

namespace DevNet.Core.Application.Interfaces
{
    public interface ITokenService
    {
        TokenResponseDto GenerateToken(CheckUserResponseDto dto);

    }
}
