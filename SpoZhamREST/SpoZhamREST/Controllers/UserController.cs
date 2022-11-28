using Microsoft.AspNetCore.Mvc;
using SpoZhamDLL.model;
using SpoZhamREST.Managers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SpoZhamREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager _userManager = new();
        
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
