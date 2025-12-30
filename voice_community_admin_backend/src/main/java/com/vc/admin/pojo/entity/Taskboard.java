package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Taskboard implements Serializable {
    private Long id;
    private String title;
    private String summary;
    private String description;
    private String background;
    private String painPoints;
    private String targetIndicators;
    private String constraints;
    private String availableResources;
    private Long boardOwnerId;
    private String boardOwnerDept;
    private String boardOwnerPosition;
    private String status; // DRAFT/REVIEWING/BIDDING/REVIEWING_BIDS/IN_PROGRESS/COMPLETED/TERMINATED
    private Timestamp bidDeadline;
    private Timestamp projectStartTime;
    private Timestamp projectEndTime;
    private String rewardScheme;
    private Integer allowCrossDept;
    private Integer allowNewcomers;
    private Integer maxBidders;
    private String tags;
    private Integer priority;
    private String difficulty;
    private String domain;
    private Long createdBy;
    private Timestamp createTime;
    private Timestamp updateTime;
    private Integer isDeleted;
}




