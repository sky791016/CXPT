package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class User implements Serializable {
    private Long id;
    private String userName;
    private String fullName;
    private String engName;
    // 个人签名
    private String signature;
    private String gender;
    private String emailAddress;
    private String mobile;
    private String nickname;
    private String timezone;
    private String territory;
    private String LANGUAGE;
    private String primaryOrgCode;
    private String type;
    private String status;
    private Timestamp lastUpdateTime;
    private String openId;
    private String avatar;
    private Integer voted;
    private Integer created;
    private Integer commented;
    // 积分
    private Integer score;
    private Boolean active;
    private Boolean isDeleted;
    private Timestamp createTime;
    private Timestamp updateTime;
    private Boolean isLeader;

}
