package com.vc.admin.service;

import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Voice;

import java.util.List;
import java.util.Map;

public interface AdminVoiceService {
    List<Voice> list(PageRequest pageRequest);
    Voice getById(Long id);
    void create(Voice voice);
    void update(Voice voice);
    void delete(Long id);
    Map<String, Object> getStatistics();
}

