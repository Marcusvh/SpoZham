using Microsoft.AspNetCore.Mvc;
using SpoZhamDLL.model;
using SpoZhamREST.Managers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SpoZhamREST.Controllers
{
    /// <summary>
    /// mellemledet mellem HTTP request og databasen
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager _userManager = new();
        
        /// <summary>
        /// modtager HTTP POST request med information fra en nyoprettet bruger
        /// 
        /// </summary>
        /// <param name="newUser">information fra nyoprettet bruger gemmes her</param>
        /// <returns>den nye bruger</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult CreateUser([FromBody] User newUser)
        {
            try
            {
                newUser.UserValidation();
                return Created("", _userManager.CreateUser(newUser));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }
        }

        [HttpPost]
        [Route("Spotify/AuthToken")]
        public IActionResult PostSpotifyInfoToDB([FromBody] int id, string access, string refresh, DateTime time)
        {
            try
            {
                return Created("", _userManager.SpotifyInfoToDB(id, access, refresh, time));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("Spotify/RefreshToken/{id}")]
        public IActionResult RefreshTokenToDB([FromBody] int id, string access, string refresh, DateTime time)
        {
            try
            {
                return Created("", _userManager.refreshToken(id, access, refresh, time));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
