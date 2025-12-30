package com.vc.admin.service;

import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.User;

import java.util.List;
import java.util.Map;

public interface AdminUserService {
    List<User> list(PageRequest pageRequest);
    User getById(Long id);
    void create(User user);
    void update(User user);
    void delete(Long id);
    Map<String, Object> getStatistics();
}

