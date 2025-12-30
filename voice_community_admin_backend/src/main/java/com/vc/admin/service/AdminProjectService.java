package com.vc.admin.service;

import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Project;

import java.util.List;
import java.util.Map;

public interface AdminProjectService {
    List<Project> list(PageRequest pageRequest);
    Project getById(Long id);
    void create(Project project);
    void update(Project project);
    void delete(Long id);
    Map<String, Object> getStatistics();
}

