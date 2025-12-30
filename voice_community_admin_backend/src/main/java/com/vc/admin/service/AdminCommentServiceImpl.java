package com.vc.admin.service;

import com.vc.admin.mapper.AdminCommentMapper;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminCommentServiceImpl implements AdminCommentService {

    @Autowired
    private AdminCommentMapper commentMapper;

    @Override
    public List<Comment> list(PageRequest pageRequest) {
        return commentMapper.selectAll(pageRequest.getKeyword());
    }

    @Override
    public Comment getById(Long id) {
        return commentMapper.selectById(id);
    }

    @Override
    public void create(Comment comment) {
        commentMapper.insert(comment);
    }

    @Override
    public void update(Comment comment) {
        commentMapper.update(comment);
    }

    @Override
    public void delete(Long id) {
        commentMapper.delete(id);
    }

    @Override
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalComments", commentMapper.countAll());
        return stats;
    }
}

