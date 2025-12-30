package com.vc.admin.mapper;

import com.vc.admin.pojo.entity.Voice;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdminVoiceMapper {
    
    @Select("SELECT * FROM voice WHERE is_deleted = 0 " +
            "AND (#{keyword} IS NULL OR #{keyword} = '' OR title LIKE '%' || #{keyword} || '%' OR content LIKE '%' || #{keyword} || '%') " +
            "ORDER BY create_time DESC")
    List<Voice> selectAll(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM voice WHERE id = #{id} AND is_deleted = 0")
    Voice selectById(Long id);
    
    @Insert("INSERT INTO voice (user_id, title, content, commented, voted, type, status, images, is_deleted, create_time, update_time) " +
            "VALUES (#{userId}, #{title}, #{content}, #{commented}, #{voted}, #{type}, #{status}, #{images}, #{isDeleted}, #{createTime}, #{updateTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Voice voice);
    
    @Update("UPDATE voice SET user_id=#{userId}, title=#{title}, content=#{content}, " +
            "commented=#{commented}, voted=#{voted}, type=#{type}, status=#{status}, " +
            "images=#{images}, update_time=#{updateTime} WHERE id=#{id}")
    void update(Voice voice);
    
    @Update("UPDATE voice SET is_deleted=1, update_time=CURRENT_TIMESTAMP WHERE id=#{id}")
    void delete(Long id);
    
    @Select("SELECT COUNT(*) FROM voice WHERE is_deleted = 0")
    Long countAll();
    
    @Select("SELECT COUNT(*) FROM voice WHERE is_deleted = 0 AND type = #{type}")
    Long countByType(String type);
}
