package com.example.notter.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.notter.db.entity.NoteEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoteRepo extends JpaRepository<NoteEntity, Integer> {
    @Query("SELECT t FROM note t WHERE t.user.id = ?1")
    List<NoteEntity> findAllByUser(Integer userId);

    @Query("SELECT t FROM note t WHERE t.user.id = ?1 AND t.id = ?2")
    NoteEntity findByUserAndId(Integer userId, Integer noteId);
}
