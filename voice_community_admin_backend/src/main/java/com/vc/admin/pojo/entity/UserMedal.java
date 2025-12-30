package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class UserMedal implements Serializable {
    private Long id;
    private Long userId;
    private Long medalId;
    private Timestamp obtainedTime;
    private Timestamp expireTime;
    // 授予来源：AUTO=系统自动，MANUAL=管理员手动，EVENT=活动
    private String sourceType;
    private String sourceRemark;
    private Boolean isDeleted;
    private Timestamp createTime;
    private Timestamp updateTime;
    
    // 关联的勋章信息（用于前端展示）
    private Medal medal;
}

