package io.quarkus.todospringquarkus;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
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
        return todoRepository.findAll();
    }
 
    @GetMapping(value = "/{id}")
    public TodoEntity findById(@PathVariable("id") Long id) {
        return todoRepository.findById(id).get();
    }

    @PutMapping
    @Transactional
    public void update(@RequestBody TodoEntity resource) {
        todoRepository.save(resource);
    }
 
    @PostMapping
    @Transactional
    public TodoEntity create(@RequestBody TodoEntity resource) {
        return todoRepository.save(resource);
    }
 
    @DeleteMapping(value = "/{id}")
    @Transactional
    public void delete(@PathVariable("id") Long id) {
        todoRepository.deleteById(id);
    }
}
