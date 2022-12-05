using Microsoft.Data.SqlClient;

namespace SpoZhamREST.Managers
{
    public class BroadcastManager
    {
        /// <summary>
        /// Bruges til at få adgang til databasen, med autoriseret
        /// </summary>
        private const string connectionString = "Data Source=zealandmarc.database.windows.net;Initial Catalog=SpoZham;User ID=AdminMarc;Password=Marcus19;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        /// <summary>
        /// Metode til at indsætte værdierne i TrackHistoryDB
        /// </summary>
        /// <param name="trackhistoryId"></param>
        /// <param name="userId"></param>
        /// <param name="trackId"></param>
        /// <returns></returns>
        public string TrackHistoryToDB(int userId, int trackId)
        {
            DateTime timestamp = DateTime.Now;

            string sql = "INSERT INTO [TrackHistory] VALUES(@userId, @trackId, @timestamp)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sql, connection);
                cmd.Parameters.AddWithValue("@userId", userId);
                cmd.Parameters.AddWithValue("@trackId", trackId);
                cmd.Parameters.AddWithValue("@timestamp", timestamp);
                cmd.Connection.Open();

                int rows = cmd.ExecuteNonQuery();
            }
            return "Success";
        }
    }
}
