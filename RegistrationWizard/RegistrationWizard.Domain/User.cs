﻿namespace RegistrationWizard.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int CountryId { get; set; }
        public int ProvinceId { get; set; }
    }
}
