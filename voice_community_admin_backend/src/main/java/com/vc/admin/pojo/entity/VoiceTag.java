package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class VoiceTag implements Serializable {
    private Long id;
    private Long voiceId;
    private Integer tagId;
    private Timestamp createTime;
    private Timestamp updateTime;
}



