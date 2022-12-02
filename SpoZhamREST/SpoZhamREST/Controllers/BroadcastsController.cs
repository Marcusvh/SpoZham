using Microsoft.AspNetCore.Mvc;
using SpoZhamREST.Managers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SpoZhamREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BroadcastsController : ControllerBase
    {
        BroadcastManager _mrg = new BroadcastManager();

        // GET: api/<BroadcastsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<BroadcastsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        [HttpPost]
        [Route("api/Broadcast")]
        public IActionResult PostTrackHistoryToDB([FromBody]int track, int trackhistoryid, int userid, int trackid)
        {
            try
            {
                return Created("", _mrg.TrackHistoryToDB(trackhistoryid, userid, trackid));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<BroadcastsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BroadcastsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
