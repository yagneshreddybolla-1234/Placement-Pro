package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // CREATE
    public User saveUser(User user) {
        return repo.save(user);
    }

    // READ ALL
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // READ BY ID
    public User getUser(Long id) {
        return repo.findById(id).orElse(null);
    }

    // DELETE
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    // UPDATE
    public User updateUser(Long id, User newUser) {
        User user = repo.findById(id).orElse(null);

        if (user != null) {
            user.setName(newUser.getName());
            user.setType(newUser.getType());
            user.setPassword(newUser.getPassword());
            return repo.save(user);
        }

        return null;
    }

    // LOGIN
    public User login(String name, String password) {
        return repo.findAll()
                .stream()
                .filter(u -> u.getName().equals(name) && u.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }
}