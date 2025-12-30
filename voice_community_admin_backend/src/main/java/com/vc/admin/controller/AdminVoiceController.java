package com.vc.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.vc.admin.pojo.dto.ApiResponse;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.dto.PageResult;
import com.vc.admin.pojo.entity.Voice;
import com.vc.admin.service.AdminVoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/admin/api/voice")
public class AdminVoiceController {

    @Autowired
    private AdminVoiceService voiceService;

    @GetMapping("/list")
    public ApiResponse<PageResult<Voice>> list(@ModelAttribute PageRequest pageRequest) {
        PageHelper.startPage(pageRequest.getPageNum(), pageRequest.getPageSize());
        var voices = voiceService.list(pageRequest);
        PageInfo<Voice> pageInfo = new PageInfo<>(voices);
        
        PageResult<Voice> result = new PageResult<>(
            pageInfo.getList(),
            pageInfo.getTotal(),
            pageRequest.getPageNum(),
            pageRequest.getPageSize()
        );
        return ApiResponse.success(result);
    }

    @GetMapping("/{id}")
    public ApiResponse<Voice> getById(@PathVariable Long id) {
        Voice voice = voiceService.getById(id);
        return ApiResponse.success(voice);
    }

    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody Voice voice) {
        voice.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
        voice.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        voice.setIsDeleted(false);
        voiceService.create(voice);
        return ApiResponse.success("创建成功", null);
    }

    @PutMapping("/update/{id}")
    public ApiResponse<String> update(@PathVariable Long id, @RequestBody Voice voice) {
        voice.setId(id);
        voice.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
        voiceService.update(voice);
        return ApiResponse.success("更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        voiceService.delete(id);
        return ApiResponse.success("删除成功", null);
    }

    @GetMapping("/statistics")
    public ApiResponse<Map<String, Object>> statistics() {
        Map<String, Object> stats = voiceService.getStatistics();
        return ApiResponse.success(stats);
    }
}

