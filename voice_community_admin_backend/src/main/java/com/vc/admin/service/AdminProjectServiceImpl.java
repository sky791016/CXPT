package com.vc.admin.service;

import com.vc.admin.mapper.AdminProjectMapper;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminProjectServiceImpl implements AdminProjectService {

    @Autowired
    private AdminProjectMapper projectMapper;

    @Override
    public List<Project> list(PageRequest pageRequest) {
        return projectMapper.selectAll(pageRequest.getKeyword());
    }

    @Override
    public Project getById(Long id) {
        return projectMapper.selectById(id);
    }

    @Override
    public void create(Project project) {
        projectMapper.insert(project);
    }

    @Override
    public void update(Project project) {
        projectMapper.update(project);
    }

    @Override
    public void delete(Long id) {
        projectMapper.delete(id);
    }

    @Override
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProjects", projectMapper.countAll());
        return stats;
    }
}

