package todo.todoapp.services;

import java.util.List;

public interface BaseService<E>{

    public List<E> findAll() throws Exception;
    public E findById(long id) throws Exception;
    public E save(E entity) throws Exception;
    public E update(long id, E entity) throws Exception;
    public boolean deleteById(long id) throws Exception;

}
