package com.vc.admin.pojo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Setter
@Getter
@Data
public class Tag implements Serializable {
    private Integer id;
    private String name;
    private Timestamp createTime;
    private Timestamp updateTime;
}

