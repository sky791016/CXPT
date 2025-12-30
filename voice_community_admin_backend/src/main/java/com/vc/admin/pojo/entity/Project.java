package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Project implements Serializable {
    private Long id;
    private Long taskboardId;
    private Long bidId;
    private Long leaderId;
    private String title;
    private String description;
    private String targetIndicators;
    private Timestamp startTime;
    private Timestamp endTime;
    private String currentStage;
    private Integer overallProgress;
    private String status; // IN_PROGRESS/REVIEWING/COMPLETED/TERMINATED
    private Long createdBy;
    private Timestamp createTime;
    private Timestamp updateTime;
    private Integer isDeleted;
}




