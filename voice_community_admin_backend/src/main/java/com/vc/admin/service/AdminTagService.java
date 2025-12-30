package com.vc.admin.service;

import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Tag;

import java.util.List;
import java.util.Map;

public interface AdminTagService {
    List<Tag> list(PageRequest pageRequest);
    Tag getById(Integer id);
    void create(Tag tag);
    void update(Tag tag);
    void delete(Integer id);
    Map<String, Object> getStatistics();
}

