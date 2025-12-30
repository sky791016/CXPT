package com.vc.admin.service;

import com.vc.admin.mapper.AdminTagMapper;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminTagServiceImpl implements AdminTagService {

    @Autowired
    private AdminTagMapper tagMapper;

    @Override
    public List<Tag> list(PageRequest pageRequest) {
        return tagMapper.selectAll(pageRequest.getKeyword());
    }

    @Override
    public Tag getById(Integer id) {
        return tagMapper.selectById(id);
    }

    @Override
    public void create(Tag tag) {
        tagMapper.insert(tag);
    }

    @Override
    public void update(Tag tag) {
        tagMapper.update(tag);
    }

    @Override
    public void delete(Integer id) {
        tagMapper.delete(id);
    }

    @Override
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTags", tagMapper.countAll());
        return stats;
    }
}

