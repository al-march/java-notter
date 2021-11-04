package com.example.notter.db.repository;

import com.example.notter.db.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface UserRepo extends CrudRepository<UserEntity, Integer> {
    @Query("select u from user u where u.email = ?1")
    UserEntity findByEmail(String email);
}
