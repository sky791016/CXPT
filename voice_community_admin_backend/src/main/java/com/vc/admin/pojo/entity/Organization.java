package com.vc.admin.pojo.entity;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class Organization implements Serializable {
    private Long id;
    private String orgCode;
    private String orgName;
    private String orgNameEn;
    private String orgNameLocal;
    private String orgFullName;
    private String orgType;
    private String seqNum;
    private String parentOrgCode;
    private String personInCharge;
    private String description;
    private String contact;
    private String address;
    private String status;
    private String lastUpdateTime;
    private Boolean isDeleted;
    private Timestamp createTime;
    private Timestamp updateTime;

}
