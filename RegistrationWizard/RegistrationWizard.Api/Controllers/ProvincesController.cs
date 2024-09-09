using Microsoft.AspNetCore.Mvc;
using RegistrationWizard.Data;
using RegistrationWizard.Domain;

namespace RegistrationWizard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController(IBaseService<Province> service) : Controller
    {
        [HttpGet("{countryId}")]
        public async Task<IActionResult> Get(int countryId)
        {
            var provinces = await service.GetAllAsync();
            return Ok(provinces.Where(p => p.CountryId == countryId).ToList());
        }
    }
}
