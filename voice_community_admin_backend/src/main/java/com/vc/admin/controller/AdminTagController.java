package com.vc.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vc.admin.pojo.dto.ApiResponse;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.dto.PageResult;
import com.vc.admin.pojo.entity.Tag;
import com.vc.admin.service.AdminTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/api/tag")
public class AdminTagController {

    @Autowired
    private AdminTagService tagService;

    @GetMapping("/list")
    public ApiResponse<PageResult<Tag>> list(@ModelAttribute PageRequest pageRequest) {
        PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
        List<Tag> tags = tagService.list(pageRequest);
        PageInfo<Tag> pageInfo = new PageInfo<>(tags);
        
        PageResult<Tag> result = new PageResult<>(
            pageInfo.getList(),
            pageInfo.getTotal(),
            pageRequest.getPageNum(),
            pageRequest.getPageSize()
        );
        return ApiResponse.success(result);
    }

    @GetMapping("/all")
    public ApiResponse<List<Tag>> getAll() {
        List<Tag> tags = tagService.list(new PageRequest());
        return ApiResponse.success(tags);
    }

    @GetMapping("/{id}")
    public ApiResponse<Tag> getById(@PathVariable Integer id) {
        Tag tag = tagService.getById(id);
        return ApiResponse.success(tag);
    }

    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody Tag tag) {
        tag.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
        tag.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        tagService.create(tag);
        return ApiResponse.success("创建成功", null);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<String> update(@PathVariable Integer id, @RequestBody Tag tag) {
        tag.setId(id);
        tag.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        tagService.update(tag);
        return ApiResponse.success("更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable Integer id) {
        tagService.delete(id);
        return ApiResponse.success("删除成功", null);
    }

    @GetMapping("/statistics")
    public ApiResponse<Map<String, Object>> statistics() {
        Map<String, Object> stats = tagService.getStatistics();
        return ApiResponse.success(stats);
    }
}

