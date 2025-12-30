package com.vc.admin.service;

import java.util.Map;

public interface AdminStatisticsService {
    Map<String, Object> getOverview();
    Map<String, Object> getUserTrend(String period);
    Map<String, Object> getVoiceTrend(String period);
}

