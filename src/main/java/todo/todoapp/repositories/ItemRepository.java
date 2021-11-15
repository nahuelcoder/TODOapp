package todo.todoapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import todo.todoapp.entities.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
