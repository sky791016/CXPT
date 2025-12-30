package com.vc.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vc.admin.pojo.dto.ApiResponse;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.dto.PageResult;
import com.vc.admin.pojo.entity.Medal;
import com.vc.admin.service.AdminMedalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/admin/api/medal")
public class AdminMedalController {

    @Autowired
    private AdminMedalService medalService;

    @GetMapping("/list")
    public ApiResponse<PageResult<Medal>> list(@ModelAttribute PageRequest pageRequest) {
        PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
        var medals = medalService.list(pageRequest);
        PageInfo<Medal> pageInfo = new PageInfo<>(medals);
        
        PageResult<Medal> result = new PageResult<>(
            pageInfo.getList(),
            pageInfo.getTotal(),
            pageRequest.getPageNum(),
            pageRequest.getPageSize()
        );
        return ApiResponse.success(result);
    }

    @GetMapping("/{id}")
    public ApiResponse<Medal> getById(@PathVariable Long id) {
        Medal medal = medalService.getById(id);
        return ApiResponse.success(medal);
    }

    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody Medal medal) {
        medal.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
        medal.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        medalService.create(medal);
        return ApiResponse.success("创建成功", null);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<String> update(@PathVariable Long id, @RequestBody Medal medal) {
        medal.setId(id);
        medal.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        medalService.update(medal);
        return ApiResponse.success("更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        medalService.delete(id);
        return ApiResponse.success("删除成功", null);
    }

    @GetMapping("/statistics")
    public ApiResponse<Map<String, Object>> statistics() {
        Map<String, Object> stats = medalService.getStatistics();
        return ApiResponse.success(stats);
    }
}

