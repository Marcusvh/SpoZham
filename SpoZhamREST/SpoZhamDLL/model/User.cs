using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpoZhamDLL.model
{
    /// <summary>
    /// Bruger login info klasse
    /// </summary>
    public class User
    {
        // TODO: tage stilling til foreign key
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        /// <summary>
        /// foreign key til database tabellen SpotifyUser
        /// </summary>
        public int FK_spotifyID { get; set; }

        public User()
        {
            
        }
        public User(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public bool UsernameValidation()
        {          
            if (String.IsNullOrWhiteSpace(Username))
                throw new ArgumentNullException("Må ikke være tom eller kun bestå af mellemrum");
            if (Username.Length > 10 && Username.Length < 4)
                throw new ArgumentException("skal være mellem 4 og 10 tegn");

            return true;
        }
        public bool PasswordValidation()
        {
            if(String.IsNullOrWhiteSpace(Password))
                throw new ArgumentNullException("Må ikke være tom eller kun bestå af mellemrum");
            if (Password.Length > 16 && Password.Length < 6)
                throw new ArgumentException("skal være mellem 6 og 16 tegn");

            return true;
        }
        
        public bool UserValidation()
        {
            if(UsernameValidation() && PasswordValidation())
                return true;
            
            return false;
        }
    }
}
