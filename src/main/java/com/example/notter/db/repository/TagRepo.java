package com.example.notter.db.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.notter.db.entity.TagEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagRepo extends CrudRepository<TagEntity, Integer> {
    @Query("select t from tag t where t.user.id = ?1")
    List<TagEntity> findByUserId(Integer id);
}
