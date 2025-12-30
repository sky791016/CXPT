package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class VoiceRecommend implements Serializable {
    private Long id;
    private Long userId;
    private Long voiceId;
    private Timestamp createTime;
    private Timestamp updateTime;
}




