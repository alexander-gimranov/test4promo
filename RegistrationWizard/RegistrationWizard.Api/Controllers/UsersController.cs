using Microsoft.AspNetCore.Mvc;
using RegistrationWizard.Data;
using RegistrationWizard.Domain;

namespace RegistrationWizard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IBaseService<User> service) : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Crete([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await service.AddAsync(user);
            return NoContent();
        }
    }
}
