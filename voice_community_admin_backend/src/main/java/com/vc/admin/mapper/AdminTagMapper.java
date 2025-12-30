package com.vc.admin.mapper;

import com.vc.admin.pojo.entity.Tag;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdminTagMapper {
    
    @Select("SELECT * FROM tag WHERE 1=1 " +
            "AND (#{keyword} IS NULL OR #{keyword} = '' OR name LIKE '%' || #{keyword} || '%') " +
            "ORDER BY id ASC")
    List<Tag> selectAll(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM tag WHERE id = #{id}")
    Tag selectById(Integer id);
    
    @Insert("INSERT INTO tag (name, create_time, update_time) " +
            "VALUES (#{name}, #{createTime}, #{updateTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Tag tag);
    
    @Update("UPDATE tag SET name=#{name}, update_time=#{updateTime} WHERE id=#{id}")
    void update(Tag tag);
    
    @Delete("DELETE FROM tag WHERE id=#{id}")
    void delete(Integer id);
    
    @Select("SELECT COUNT(*) FROM tag")
    Long countAll();
}

