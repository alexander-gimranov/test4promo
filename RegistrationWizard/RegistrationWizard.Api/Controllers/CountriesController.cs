using Microsoft.AspNetCore.Mvc;
using RegistrationWizard.Data;
using RegistrationWizard.Domain;

namespace RegistrationWizard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController(IBaseService<Country> service) : Controller
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var countries = await service.GetAllAsync();
            return Ok(countries);
        }
    }
}
