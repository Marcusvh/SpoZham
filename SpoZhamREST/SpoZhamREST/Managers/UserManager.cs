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

        public string SpotifyInfoToDB(int id, string access, string refresh, DateTime time)
        {
            string sql = "INSERT INTO SpotifyUser VALUES(@id, @access, @refresh, @time)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sql,connection);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@access", access);
                cmd.Parameters.AddWithValue("@refresh", refresh);
                cmd.Parameters.AddWithValue("@time", time);
                cmd.Connection.Open();

                int rows = cmd.ExecuteNonQuery();
            }
            return "Success";
        }

        public string refreshToken(int id, string access, string refresh, DateTime time)
        {
            string Sql = "UPDATE spotifyUser SET Access_Token = @access, Refresh_Token = @refresh, TimeRecived = @time where Spotify_Id = @id";

            using(SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(Sql, connection);
                cmd.Parameters.AddWithValue("@access", access);
                cmd.Parameters.AddWithValue("@refresh", refresh);
                cmd.Parameters.AddWithValue("@time", time);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Connection.Open();


                int rows = cmd.ExecuteNonQuery();
            }

            return "Success";
        }

    }
}
