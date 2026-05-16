package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service;

    // CREATE
    @PostMapping
    public User addUser(@RequestBody User user) {
        return service.saveUser(user);
    }

    // GET ALL
    @GetMapping
    public List<User> getUsers() {
        return service.getAllUsers();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return service.getUser(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return "Deleted";
    }
 // UPDATE
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return service.updateUser(id, user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return service.login(user.getName(), user.getPassword());
    }
}