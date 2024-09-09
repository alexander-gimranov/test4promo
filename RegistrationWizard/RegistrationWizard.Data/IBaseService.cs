namespace RegistrationWizard.Data
{
    public interface IBaseService<T>
    {
        Task<IReadOnlyCollection<T>> GetAllAsync();
        Task AddAsync(T entity);
    }
}
