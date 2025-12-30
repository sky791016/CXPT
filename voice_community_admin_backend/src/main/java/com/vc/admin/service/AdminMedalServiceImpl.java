package com.vc.admin.service;

import com.vc.admin.mapper.AdminMedalMapper;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Medal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminMedalServiceImpl implements AdminMedalService {

    @Autowired
    private AdminMedalMapper medalMapper;

    @Override
    public List<Medal> list(PageRequest pageRequest) {
        return medalMapper.selectAll(pageRequest.getKeyword());
    }

    @Override
    public Medal getById(Long id) {
        return medalMapper.selectById(id);
    }

    @Override
    public void create(Medal medal) {
        medalMapper.insert(medal);
    }

    @Override
    public void update(Medal medal) {
        medalMapper.update(medal);
    }

    @Override
    public void delete(Long id) {
        medalMapper.delete(id);
    }

    @Override
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalMedals", medalMapper.countAll());
        return stats;
    }
}

