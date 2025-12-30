package com.vc.admin.mapper;

import com.vc.admin.pojo.entity.Project;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdminProjectMapper {
    
    @Select("SELECT * FROM project WHERE is_deleted = 0 " +
            "AND (#{keyword} IS NULL OR #{keyword} = '' OR title LIKE '%' || #{keyword} || '%' OR description LIKE '%' || #{keyword} || '%') " +
            "ORDER BY create_time DESC")
    List<Project> selectAll(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM project WHERE id = #{id} AND is_deleted = 0")
    Project selectById(Long id);
    
    @Insert("INSERT INTO project (taskboard_id, bid_id, leader_id, title, description, target_indicators, " +
            "start_time, end_time, current_stage, overall_progress, status, created_by, is_deleted, create_time, update_time) " +
            "VALUES (#{taskboardId}, #{bidId}, #{leaderId}, #{title}, #{description}, #{targetIndicators}, " +
            "#{startTime}, #{endTime}, #{currentStage}, #{overallProgress}, #{status}, #{createdBy}, #{isDeleted}, #{createTime}, #{updateTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Project project);
    
    @Update("UPDATE project SET taskboard_id=#{taskboardId}, bid_id=#{bidId}, leader_id=#{leaderId}, " +
            "title=#{title}, description=#{description}, target_indicators=#{targetIndicators}, " +
            "start_time=#{startTime}, end_time=#{endTime}, current_stage=#{currentStage}, " +
            "overall_progress=#{overallProgress}, status=#{status}, created_by=#{createdBy}, " +
            "update_time=#{updateTime} WHERE id=#{id}")
    void update(Project project);
    
    @Update("UPDATE project SET is_deleted=1, update_time=CURRENT_TIMESTAMP WHERE id=#{id}")
    void delete(Long id);
    
    @Select("SELECT COUNT(*) FROM project WHERE is_deleted = 0")
    Long countAll();
}

