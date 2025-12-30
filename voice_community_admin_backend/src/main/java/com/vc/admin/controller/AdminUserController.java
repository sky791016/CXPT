package com.vc.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vc.admin.pojo.dto.ApiResponse;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.dto.PageResult;
import com.vc.admin.pojo.entity.User;
import com.vc.admin.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/api/user")
public class AdminUserController {

    @Autowired
    private AdminUserService userService;

    @GetMapping("/list")
    public ApiResponse<PageResult<User>> list(@ModelAttribute PageRequest pageRequest) {
        PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
        List<User> users = userService.list(pageRequest);
        PageInfo<User> pageInfo = new PageInfo<>(users);
        
        PageResult<User> result = new PageResult<>(
            pageInfo.getList(),
            pageInfo.getTotal(),
            pageRequest.getPageNum(),
            pageRequest.getPageSize()
        );
        return ApiResponse.success(result);
    }

    @GetMapping("/{id}")
    public ApiResponse<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        return ApiResponse.success(user);
    }

    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody User user) {
        user.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
        user.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        user.setIsDeleted(false);
        userService.create(user);
        return ApiResponse.success("创建成功", null);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<String> update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        user.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        userService.update(user);
        return ApiResponse.success("更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        userService.delete(id);
        return ApiResponse.success("删除成功", null);
    }

    @GetMapping("/statistics")
    public ApiResponse<Map<String, Object>> statistics() {
        Map<String, Object> stats = userService.getStatistics();
        return ApiResponse.success(stats);
    }
}

