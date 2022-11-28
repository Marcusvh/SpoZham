using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using SpoZhamDLL.model;

namespace SpoZhamREST.Managers
{
    public class UserManager
    {
        private const string connectionString = "Data Source=zealandmarc.database.windows.net;Initial Catalog=SpoZham;User ID=AdminMarc;Password=Marcus19;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";


        public User CreateUser(User newUser)
        {
            User user = new();

            string sql = $"INSERT INTO [User] VALUES(@Username, @Password)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sql, connection);
                cmd.Parameters.AddWithValue("@Username", newUser.UserName);
                cmd.Parameters.AddWithValue("@Password", newUser.Password);
                cmd.Connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    return user;
                }
            }

            return user;
        }
    }
}
