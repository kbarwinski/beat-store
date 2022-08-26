using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Contracts;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected RepositoryContext repositoryContext;

        protected RepositoryBase(RepositoryContext repositoryContext)
        {
            this.repositoryContext = repositoryContext;
        }

        public void Create(T entity)
        {
            repositoryContext.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            repositoryContext.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            repositoryContext.Set<T>().Update(entity);
        }

        public IQueryable<T> FindAll(bool trackChanges)
        {
            return !trackChanges ? repositoryContext.Set<T>().AsNoTracking() : repositoryContext.Set<T>();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges)
        {
            return !trackChanges ? repositoryContext.Set<T>().Where(expression).AsNoTracking() : repositoryContext.Set<T>().Where(expression);
        }

    }
}
