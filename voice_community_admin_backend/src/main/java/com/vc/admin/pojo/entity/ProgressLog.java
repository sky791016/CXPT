package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class ProgressLog implements Serializable {
    private Long id;
    private Long projectId;
    private Long milestoneId;
    private Long authorId;
    private String contentSummary;
    private String contentDetail;
    private Integer currentProgress;
    private String progressStatus; // NORMAL/AHEAD/DELAYED
    private String impactScope;
    private String risks;
    private String supportNeeded;
    private String attachments;
    private String notifyUsers;
    private Timestamp createTime;
}




