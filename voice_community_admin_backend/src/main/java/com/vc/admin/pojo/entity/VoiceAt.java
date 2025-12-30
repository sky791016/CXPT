package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class VoiceAt implements Serializable {
    private Long id;
    private Long voiceId;
    private Long userId;
    private Boolean isRead;
    private Timestamp createTime;
    private Timestamp updateTime;
}



