package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class VoiceAgree implements Serializable {
    private Long id;
    private Long userId;
    private Long voiceId;
    // agreeType: 1=赞同, 0=不赞同
    private Integer agreeType;
    private Timestamp createTime;
    private Timestamp updateTime;
}




