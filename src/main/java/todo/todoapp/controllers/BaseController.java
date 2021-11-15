package todo.todoapp.controllers;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface BaseController <E, Long> {

    public ResponseEntity<?> getAll();
    public ResponseEntity<?> getOne(@PathVariable Long id);
    public ResponseEntity<?> save(@RequestBody E entity);
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody E entity);
    public ResponseEntity<?> delete(@PathVariable Long id);

}
