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
        [Route("Spotify/AddToken")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult PostSpotifyInfoToDB([FromQuery] spot spot)
        {
            try
            {
                return Created("", _userManager.SpotifyInfoToDB(spot));
            }
            catch (Exception e)
            {
                return BadRequest("fukka u");
            }
        }

        [HttpGet]
        [Route("Spotify/Token")]
        public IActionResult GetToken([FromQuery] string id)
        {
            try
            {
                return Ok(_userManager.GetToken(id));
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
            
        }

        [HttpGet]
        [Route("Spotify/GetRefreshToken")]
        public string GetRefreshToken([FromQuery] string id)
        {
            return _userManager.GetRefreshToken(id);
        }

        [HttpPost]
        [Route("Spotify/RefreshToken")]
        public IActionResult RefreshTokenToDB([FromQuery] string id, string access)
        {
            try
            {
                return Created("", _userManager.refreshToken(id, access));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
