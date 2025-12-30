package com.vc.admin.mapper;

import com.vc.admin.pojo.entity.Medal;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdminMedalMapper {
    
    @Select("SELECT * FROM medal WHERE 1=1 " +
            "AND (#{keyword} IS NULL OR #{keyword} = '' OR name LIKE '%' || #{keyword} || '%' OR code LIKE '%' || #{keyword} || '%') " +
            "ORDER BY sort_no ASC, id ASC")
    List<Medal> selectAll(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM medal WHERE id = #{id}")
    Medal selectById(Integer id);
    
    @Insert("INSERT INTO medal (code, name, description, icon_url, grant_type, min_score, min_created, min_commented, min_voted, require_leader, enabled, sort_no, create_time, update_time) " +
            "VALUES (#{code}, #{name}, #{description}, #{iconUrl}, #{grantType}, #{minScore}, #{minCreated}, #{minCommented}, #{minVoted}, #{requireLeader}, #{enabled}, #{sortNo}, #{createTime}, #{updateTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Medal medal);
    
    @Update("UPDATE medal SET code=#{code}, name=#{name}, description=#{description}, icon_url=#{iconUrl}, " +
            "grant_type=#{grantType}, min_score=#{minScore}, min_created=#{minCreated}, min_commented=#{minCommented}, " +
            "min_voted=#{minVoted}, require_leader=#{requireLeader}, enabled=#{enabled}, sort_no=#{sortNo}, " +
            "update_time=#{updateTime} WHERE id=#{id}")
    void update(Medal medal);
    
    @Delete("DELETE FROM medal WHERE id=#{id}")
    void delete(Integer id);
    
    @Select("SELECT COUNT(*) FROM medal")
    Long countAll();
}

