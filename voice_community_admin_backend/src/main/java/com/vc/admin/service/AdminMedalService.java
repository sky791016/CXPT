package com.vc.admin.service;

import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Medal;

import java.util.List;
import java.util.Map;

public interface AdminMedalService {
    List<Medal> list(PageRequest pageRequest);
    Medal getById(Integer id);
    void create(Medal medal);
    void update(Medal medal);
    void delete(Integer id);
    Map<String, Object> getStatistics();
}

