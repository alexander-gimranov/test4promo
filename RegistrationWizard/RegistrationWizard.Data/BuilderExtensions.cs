using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RegistrationWizard.Domain;

namespace RegistrationWizard.Data
{
    public static class BuilderExtensions
    {
        public static IServiceCollection ConfigureData(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase("InMemoryDb"));
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            return services;
        }

        public static void FillTestData(this IServiceProvider services)
        {
            using (var scope = services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                if (!dbContext.Countries.Any())
                {
                    dbContext.Countries.AddRange(
                        new Country { Id = 1, Name = "Country1" },
                        new Country { Id = 2, Name = "Country2" }
                    );
                    dbContext.SaveChanges();
                }

                if (!dbContext.Provinces.Any())
                {
                    dbContext.Provinces.AddRange(
                        new Province { Id = 1, CountryId = 1, Name = "Province1.1" },
                        new Province { Id = 2, CountryId = 1, Name = "Province1.2" },
                        new Province { Id = 3, CountryId = 2, Name = "Province2.1" }
                    );
                    dbContext.SaveChanges();
                }
            }
        }

    }
}
