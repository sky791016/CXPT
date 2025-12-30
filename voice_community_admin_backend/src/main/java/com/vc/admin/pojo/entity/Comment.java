package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigInteger;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Comment implements Serializable {
    private BigInteger id;
    private Long voiceId;
    private Long userId;
    private Long userIdCommented;
    private String content;
    // 回复ID
    private BigInteger commentId;
    private String images;
    private Integer voted;
    private Integer commented;
    private Boolean isDeleted;
    private Timestamp createTime;
    private Timestamp updateTime;
}
