using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpoZhamDLL.model
{
    public class spot
    {
        public string id { get; set; }
        public string access { get; set; }
        public string refresh { get; set; }
        public DateTime? TimeStamp { get; set; }
    }
}
