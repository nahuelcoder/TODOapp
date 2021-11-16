package todo.todoapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import todo.todoapp.entities.Item;
import todo.todoapp.repositories.ItemRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService implements BaseService<Item>{

    @Autowired
    protected ItemRepository repository;

    @Override
    @Transactional
    public List<Item> findAll() throws Exception {
        try {
            List<Item> entities = this.repository.findAll();
            return entities;
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Item findById(long id) throws Exception {
        try {
            Optional<Item> entityOptional = this.repository.findById(id);
            return entityOptional.get();
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Item save(Item entity) throws Exception {
        try {
            entity = this.repository.save(entity);
            return entity;
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Item update(long id, Item entity) throws Exception {
        try {
            Optional<Item> entityOptional = this.repository.findById(id);
            Item item = entityOptional.get();
            item = this.repository.save(entity);
            return item;
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public boolean deleteById(long id) throws Exception {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                return true;
            } else {
                throw new Exception();
            }
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
