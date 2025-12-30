package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Bid implements Serializable {
    private Long id;
    private Long taskboardId;
    private Long bidderId;
    private String bidderDept;
    private String bidType; // INDIVIDUAL/TEAM
    private Long teamId;
    private String solutionSummary;
    private String solutionDetail;
    private String milestones;
    private String resourceRequirements;
    private String riskAssessment;
    private String attachments;
    private Double reviewScore;
    private String reviewOpinion;
    private Integer isSelected;
    private String reviewStatus; // PENDING/REVIEWING/APPROVED/REJECTED
    private Long createdBy;
    private Timestamp createTime;
    private Timestamp updateTime;
    private Integer isDeleted;
}




