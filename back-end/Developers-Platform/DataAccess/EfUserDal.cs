using Developers_Platform.Business.AuthService;
using Developers_Platform.Models;

namespace Developers_Platform.DataAccess
{
    public class EfUserDal 
    {      
        public List<User> GetUserDetails()
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                var result = from u in context.Users //Table name map here
                             select new User
                             {                          
                                 Email = u.Email,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName, 
                                 Password = u.Password,
                                 Gender = u.Gender,
                                 Age = u.Age,
                                 Country = u.Country,
                             };
                return result.ToList();
            }
        }

    }     
}
