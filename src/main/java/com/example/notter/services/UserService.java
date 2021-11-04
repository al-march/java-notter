package com.example.notter.services;

import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.UserRepo;
import com.example.notter.exception.UserAlreadyExistException;
import com.example.notter.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    private final UserRepo userRepo;


    public UserService(UserRepo userRepository) {
        this.userRepo = userRepository;
    }

    public User add(UserEntity user) throws UserAlreadyExistException {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            throw new UserAlreadyExistException();
        }
        return User.toModel(userRepo.save(user));
    }

    public List<User> getAll() {
        Iterable<UserEntity> entities = userRepo.findAll();
        return StreamSupport.stream(entities.spliterator(), false)
                .collect(Collectors.toList())
                .stream().map(User::toModel)
                .collect(Collectors.toList());
    }
}