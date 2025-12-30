package com.vc.admin.service;

import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Comment;

import java.util.List;
import java.util.Map;

public interface AdminCommentService {
    List<Comment> list(PageRequest pageRequest);
    Comment getById(Long id);
    void create(Comment comment);
    void update(Comment comment);
    void delete(Long id);
    Map<String, Object> getStatistics();
}

