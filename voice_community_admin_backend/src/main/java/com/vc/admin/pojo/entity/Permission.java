package com.vc.admin.pojo.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Permission implements Serializable {
    private Integer id;
    private String name;
    private String value;
    // 权限的父节点的id
    private Integer pid;
}
