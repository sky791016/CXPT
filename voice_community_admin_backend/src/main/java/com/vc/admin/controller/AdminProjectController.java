package com.vc.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vc.admin.pojo.dto.ApiResponse;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.dto.PageResult;
import com.vc.admin.pojo.entity.Project;
import com.vc.admin.service.AdminProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/admin/api/project")
public class AdminProjectController {

    @Autowired
    private AdminProjectService projectService;

    @GetMapping("/list")
    public ApiResponse<PageResult<Project>> list(@ModelAttribute PageRequest pageRequest) {
        PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
        var projects = projectService.list(pageRequest);
        PageInfo<Project> pageInfo = new PageInfo<>(projects);
        
        PageResult<Project> result = new PageResult<>(
            pageInfo.getList(),
            pageInfo.getTotal(),
            pageRequest.getPageNum(),
            pageRequest.getPageSize()
        );
        return ApiResponse.success(result);
    }

    @GetMapping("/{id}")
    public ApiResponse<Project> getById(@PathVariable Long id) {
        Project project = projectService.getById(id);
        return ApiResponse.success(project);
    }

    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody Project project) {
        project.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
        project.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        project.setIsDeleted(0);
        projectService.create(project);
        return ApiResponse.success("创建成功", null);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<String> update(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        project.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        projectService.update(project);
        return ApiResponse.success("更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        projectService.delete(id);
        return ApiResponse.success("删除成功", null);
    }

    @GetMapping("/statistics")
    public ApiResponse<Map<String, Object>> statistics() {
        Map<String, Object> stats = projectService.getStatistics();
        return ApiResponse.success(stats);
    }
}

