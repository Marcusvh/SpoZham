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
                return Created("", _userManager.CreateUser(newUser));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }
        }

        
    }
}
