﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpoZhamDLL.model
{
    public class User
    {

        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int FK_spotifyID { get; set; }

        public User()
        {
            
        }
    }
}
