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
        /// <summary>
        /// opretter en spotify bruger med tokens (access og refresh) samt timestamp
        /// </summary>
        /// <param name="spot">oplysninger for at kunne oprette en spotify bruger i databasen</param>
        /// <returns>text streng der fortæller at det er gået godt</returns>
        public string SpotifyInfoToDB(spot spot)
        {
            if(spot == null)
            {
                throw new ArgumentNullException("fik ikke nogle oplysninger med");
            }

            string sql = "INSERT INTO SpotifyUser VALUES(@id, @access, @refresh, @time)";
            DateTime dateToken = DateTime.Now;
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sql,connection);
                cmd.Parameters.AddWithValue("@id", spot.id);
                cmd.Parameters.AddWithValue("@access", spot.access);
                cmd.Parameters.AddWithValue("@refresh", spot.refresh);
                cmd.Parameters.AddWithValue("@time", dateToken);
                cmd.Connection.Open();

                int rows = cmd.ExecuteNonQuery();
            }
            return "Success";
        }

        /// <summary>
        /// henter refresh token fra databasen baseret på det SpotifyUser_Id der bliver sendt med
        /// </summary>
        /// <param name="id">spotify user ID</param>
        /// <returns>sender refresh token for spotify useren</returns>
        public string GetRefreshToken(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentNullException("Der skal sendes et id med");

            string token = "";

            string sqlGet = "SELECT Refresh_Token FROM SpotifyUser WHERE Spotify_Id = @id";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sqlGet, connection);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Connection.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if(reader.Read())
                {
                    token = reader.GetString(0);
                }
                return token;
            }
        }

        public bool ValidateSpotifyUserId(string id)
        {
            string actualuserid = "";

            bool idexist = false;

            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentNullException("spotify usesr id er tom");
            }

            string Sql = "select Spotify_Id from spotifyUser";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(Sql, connection);
                cmd.Connection.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {

                    actualuserid = reader.GetString(0);
                    if (actualuserid == id)
                    {
                        idexist = true;
                    }
                   
                }
            }

            return idexist;
        }

        public string refreshToken(string id, string access)
        {

            if (ValidateSpotifyUserId(id) == false)
            {
                throw new ArgumentException("Spotify User Id matcher ikke.");
            }

            if (string.IsNullOrWhiteSpace(id) || string.IsNullOrWhiteSpace(access))
                throw new ArgumentNullException("spotify id og refresh er tom");

            string Sql = "UPDATE spotifyUser SET Access_Token = @access, TimeRecived = @time where Spotify_Id = @id";

            DateTime dateToken = DateTime.Now;

            using(SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(Sql, connection);
                cmd.Parameters.AddWithValue("@access", access);
                cmd.Parameters.AddWithValue("@time", dateToken);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Connection.Open();


                int rows = cmd.ExecuteNonQuery();
            }

            return "Success";
        }

        public spot GetToken(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentNullException("Spotify user id er tom");

            spot spot = new();

            string Sql = "select * from SpotifyUser where Spotify_Id = @id";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(Sql, connection);
                cmd.Connection.Open();
                cmd.Parameters.AddWithValue("@id", id);

                SqlDataReader reader = cmd.ExecuteReader();

                if(reader.Read())
                {
                    spot.id = reader.GetString(0);
                    spot.access = reader.GetString(1);
                    spot.refresh = reader.GetString(2);
                    spot.TimeStamp = reader.GetDateTime(3);
                }
        
            }

            return spot;
        }
    }
}
