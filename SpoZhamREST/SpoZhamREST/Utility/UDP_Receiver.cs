using System.Net;
using System.Net.Sockets;
using System.Text;

namespace SpoZhamREST.Utility
{
    public class UDP_Receiver
    {
        private const int listeningPort = 17000;
        public string UDPReciever()
        {
            Socket sock = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            IPEndPoint iep = new IPEndPoint(IPAddress.Any, listeningPort);
            sock.Bind(iep);
            EndPoint ep = (EndPoint)iep;
            Console.WriteLine("Ready to receive...");

            byte[] data = new byte[1024];
            int recv = sock.ReceiveFrom(data, ref ep);
            string stringData = Encoding.ASCII.GetString(data, 0, recv);
            Console.WriteLine("received: {0}  from: {1}", stringData, ep.ToString());

            sock.Close();

            return stringData;
        }
    }
}
