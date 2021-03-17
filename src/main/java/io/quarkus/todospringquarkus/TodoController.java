package io.quarkus.todospringquarkus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<TodoEntity> findAll() {
        return this.todoRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
 
    @GetMapping("/{id}")
    public TodoEntity findById(@PathVariable("id") Long id) {
        return this.todoRepository.findById(id).get();
    }

    @PutMapping
    public void update(@RequestBody TodoEntity resource) {
        this.todoRepository.save(resource);
    }
 
    @PostMapping
    public TodoEntity create(@RequestBody TodoEntity resource) {
        return this.todoRepository.save(resource);
    }
 
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        this.todoRepository.deleteById(id);
    }
}
