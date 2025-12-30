package com.vc.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vc.admin.pojo.dto.ApiResponse;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.dto.PageResult;
import com.vc.admin.pojo.entity.Comment;
import com.vc.admin.service.AdminCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/admin/api/comment")
public class AdminCommentController {

    @Autowired
    private AdminCommentService commentService;

    @GetMapping("/list")
    public ApiResponse<PageResult<Comment>> list(@ModelAttribute PageRequest pageRequest) {
        PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
        var comments = commentService.list(pageRequest);
        PageInfo<Comment> pageInfo = new PageInfo<>(comments);
        
        PageResult<Comment> result = new PageResult<>(
            pageInfo.getList(),
            pageInfo.getTotal(),
            pageRequest.getPageNum(),
            pageRequest.getPageSize()
        );
        return ApiResponse.success(result);
    }

    @GetMapping("/{id}")
    public ApiResponse<Comment> getById(@PathVariable String id) {
        Comment comment = commentService.getById(Long.parseLong(id));
        return ApiResponse.success(comment);
    }

    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody Comment comment) {
        comment.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
        comment.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        comment.setIsDeleted(false);
        commentService.create(comment);
        return ApiResponse.success("创建成功", null);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<String> update(@PathVariable String id, @RequestBody Comment comment) {
        comment.setId(java.math.BigInteger.valueOf(Long.parseLong(id)));
        comment.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        commentService.update(comment);
        return ApiResponse.success("更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable String id) {
        commentService.delete(Long.parseLong(id));
        return ApiResponse.success("删除成功", null);
    }

    @GetMapping("/statistics")
    public ApiResponse<Map<String, Object>> statistics() {
        Map<String, Object> stats = commentService.getStatistics();
        return ApiResponse.success(stats);
    }
}

