using Microsoft.Data.SqlClient;
using SpoZhamDLL.model;

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
        public string TrackHistoryToDB(string trackId)
        {
            DateTime timestamp = DateTime.Now;

            string sql = "INSERT INTO [TrackHistory] VALUES(1, @trackId, @timestamp)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sql, connection);
                cmd.Parameters.AddWithValue("@trackId", trackId);
                cmd.Parameters.AddWithValue("@timestamp", timestamp);
                cmd.Connection.Open();

                int rows = cmd.ExecuteNonQuery();
            }
            return "Success";
        }
        public string GetTrackId()
        {
            string trackId = "";
            string sql = "select Track_Id from TrackHistory where Track_History_Id = (select max(Track_History_Id) from TrackHistory)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(sql, connection);
                cmd.Connection.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                    trackId = reader.GetString(0);

                return trackId;

            }
        }
    }
}
