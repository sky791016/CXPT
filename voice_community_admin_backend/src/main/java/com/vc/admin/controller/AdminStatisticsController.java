package com.vc.admin.controller;

import com.vc.admin.pojo.dto.ApiResponse;
import com.vc.admin.service.AdminStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/api/statistics")
public class AdminStatisticsController {

    @Autowired
    private AdminStatisticsService statisticsService;

    @GetMapping("/overview")
    public ApiResponse<Map<String, Object>> getOverview() {
        Map<String, Object> overview = statisticsService.getOverview();
        return ApiResponse.success(overview);
    }

    @GetMapping("/user-trend")
    public ApiResponse<Map<String, Object>> getUserTrend(@RequestParam(required = false) String period) {
        Map<String, Object> trend = statisticsService.getUserTrend(period);
        return ApiResponse.success(trend);
    }

    @GetMapping("/voice-trend")
    public ApiResponse<Map<String, Object>> getVoiceTrend(@RequestParam(required = false) String period) {
        Map<String, Object> trend = statisticsService.getVoiceTrend(period);
        return ApiResponse.success(trend);
    }
}

