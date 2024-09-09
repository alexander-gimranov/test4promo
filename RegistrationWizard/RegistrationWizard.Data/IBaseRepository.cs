namespace RegistrationWizard.Data
{
    public interface IBaseRepository<T>
    {
        Task<IReadOnlyCollection<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task SaveChangesAsync();
    }
}
