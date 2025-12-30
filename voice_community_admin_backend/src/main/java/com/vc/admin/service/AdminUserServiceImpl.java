package com.vc.admin.service;

import com.vc.admin.mapper.AdminUserMapper;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserMapper userMapper;

    @Override
    public List<User> list(PageRequest pageRequest) {
        return userMapper.selectAll(pageRequest.getKeyword());
    }

    @Override
    public User getById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public void create(User user) {
        userMapper.insert(user);
    }

    @Override
    public void update(User user) {
        userMapper.update(user);
    }

    @Override
    public void delete(Long id) {
        userMapper.delete(id);
    }

    @Override
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userMapper.countAll());
        stats.put("activeUsers", userMapper.countActive());
        stats.put("leaderUsers", userMapper.countLeaders());
        return stats;
    }
}

