namespace DevNet.Core.Application.DTOs
{
    public class CheckUserResponseDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool IsExist { get; set; }
    }
}
