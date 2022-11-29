using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using SpoZhamDLL.model;

namespace SpoZhamREST.Managers
{
    /// <summary>
    /// Bruges til at tilføje en bruger og læse den fra databasen 
    /// </summary>
    public class UserManager
    {
        /// <summary>
        /// Bruges til at få adgang til databasen, med autoriseret
        /// </summary>
        private const string connectionString = "Data Source=zealandmarc.database.windows.net;Initial Catalog=SpoZham;User ID=AdminMarc;Password=Marcus19;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        /// <summary>
        /// opretter ny bruger i databasen
        /// </summary>
        /// <param name="newUser">bruger infomation til den nye bruger</param>
        /// <returns>den nye bruger</returns>
        public User CreateUser(User newUser)
        {
            if (newUser == null)
                throw new ArgumentNullException("kunne ikke oprette den nye bruger. prøv igen");

            string sql = $"INSERT INTO [User] VALUES(@Username, @Password)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sql, connection);
                cmd.Parameters.AddWithValue("@Username", newUser.Username);
                cmd.Parameters.AddWithValue("@Password", newUser.Password);
                cmd.Connection.Open();
                int rows = cmd.ExecuteNonQuery();

                if (rows == 0)
                    throw new ArgumentException("der skete en fejl i databasen. kunne ikke oprette den nye bruger");

                return newUser;
            }
        }

    }
}
