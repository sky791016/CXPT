package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Voice implements Serializable {
    private Long id;
    private Long userId;
    private String title;
    private String content;
    // 评论数
    private Integer commented;
    // 点赞数
    private Integer voted;
    // 推荐数（用于创新想法）
    private Integer recommended;
    // 赞同数（用于吐槽）
    private Integer agreed;
    // 不赞同数（用于吐槽）
    private Integer disagreed;
    private String type;
    private String status;
    // 创意类型（仅用于type='IDEA'的创意）
    private String ideaType;
    private String images;
    private Boolean isDeleted;
    private Timestamp createTime;
    private Timestamp updateTime;
}


