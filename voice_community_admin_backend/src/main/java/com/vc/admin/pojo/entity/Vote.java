package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Vote implements Serializable {
    private Long id;
    private Long voiceId;
    private Long userId;
    private Long commentId;
    private Timestamp createTime;
    private Timestamp updateTime;
}



