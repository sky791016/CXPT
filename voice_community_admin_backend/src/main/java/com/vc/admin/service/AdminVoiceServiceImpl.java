package com.vc.admin.service;

import com.vc.admin.mapper.AdminVoiceMapper;
import com.vc.admin.pojo.dto.PageRequest;
import com.vc.admin.pojo.entity.Voice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminVoiceServiceImpl implements AdminVoiceService {

    @Autowired
    private AdminVoiceMapper voiceMapper;

    @Override
    public List<Voice> list(PageRequest pageRequest) {
        return voiceMapper.selectAll(pageRequest.getKeyword());
    }

    @Override
    public Voice getById(Long id) {
        return voiceMapper.selectById(id);
    }

    @Override
    public void create(Voice voice) {
        voiceMapper.insert(voice);
    }

    @Override
    public void update(Voice voice) {
        voiceMapper.update(voice);
    }

    @Override
    public void delete(Long id) {
        voiceMapper.delete(id);
    }

    @Override
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalVoices", voiceMapper.countAll());
        stats.put("ideaCount", voiceMapper.countByType("IDEA"));
        stats.put("gossipingCount", voiceMapper.countByType("GOSSIPING"));
        return stats;
    }
}

