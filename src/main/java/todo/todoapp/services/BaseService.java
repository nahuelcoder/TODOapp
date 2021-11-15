package todo.todoapp.services;

import java.util.List;

public interface BaseService<E>{

    public List<E> findAll() throws Exception;
    public E findById(long id) throws Exception;
    public E saveOne(E entity) throws Exception;
    public E updateOne(long id, E entity) throws Exception;
    public boolean deleteById(long id) throws Exception;

}
