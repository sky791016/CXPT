package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Medal implements Serializable {
    private Long id;
    private String code;
    private String name;
    private String description;
    private String iconUrl;
    // 授予方式：AUTO=自动，MANUAL=手动，MIXED=自动+可人工授予
    private String grantType;
    // 条件字段
    private Integer minScore;
    private Integer minCreated;
    private Integer minCommented;
    private Integer minVoted;
    private Boolean requireLeader;
    // 状态控制
    private Boolean enabled;
    private Integer sortNo;
    private Timestamp createTime;
    private Timestamp updateTime;
}




