package com.vc.admin.service;

import com.vc.admin.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminStatisticsServiceImpl implements AdminStatisticsService {

    @Autowired
    private AdminUserMapper userMapper;
    
    @Autowired
    private AdminVoiceMapper voiceMapper;
    
    @Autowired
    private AdminCommentMapper commentMapper;
    
    @Autowired
    private AdminTagMapper tagMapper;
    
    @Autowired
    private AdminMedalMapper medalMapper;

    @Override
    public Map<String, Object> getOverview() {
        Map<String, Object> overview = new HashMap<>();
        overview.put("totalUsers", userMapper.countAll());
        overview.put("activeUsers", userMapper.countActive());
        overview.put("totalVoices", voiceMapper.countAll());
        overview.put("ideaCount", voiceMapper.countByType("IDEA"));
        overview.put("gossipingCount", voiceMapper.countByType("GOSSIPING"));
        overview.put("totalComments", commentMapper.countAll());
        overview.put("totalTags", tagMapper.countAll());
        overview.put("totalMedals", medalMapper.countAll());
        return overview;
    }

    @Override
    public Map<String, Object> getUserTrend(String period) {
        // TODO: 实现用户趋势统计
        Map<String, Object> trend = new HashMap<>();
        trend.put("message", "用户趋势统计功能待实现");
        return trend;
    }

    @Override
    public Map<String, Object> getVoiceTrend(String period) {
        // TODO: 实现心声趋势统计
        Map<String, Object> trend = new HashMap<>();
        trend.put("message", "心声趋势统计功能待实现");
        return trend;
    }
}

