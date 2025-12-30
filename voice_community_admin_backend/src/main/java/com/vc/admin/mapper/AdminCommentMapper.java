package com.vc.admin.mapper;

import com.vc.admin.pojo.entity.Comment;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdminCommentMapper {
    
    @Select("SELECT * FROM COMMENT WHERE is_deleted = 0 " +
            "AND (#{keyword} IS NULL OR #{keyword} = '' OR content LIKE '%' || #{keyword} || '%') " +
            "ORDER BY create_time DESC")
    List<Comment> selectAll(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM COMMENT WHERE id = #{id} AND is_deleted = 0")
    Comment selectById(@Param("id") Long id);
    
    @Insert("INSERT INTO COMMENT (voice_id, user_id, user_id_commented, content, comment_id, images, voted, commented, is_deleted, create_time, update_time) " +
            "VALUES (#{voiceId}, #{userId}, #{userIdCommented}, #{content}, #{commentId}, #{images}, #{voted}, #{commented}, #{isDeleted}, #{createTime}, #{updateTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Comment comment);
    
    @Update("UPDATE COMMENT SET voice_id=#{voiceId}, user_id=#{userId}, content=#{content}, " +
            "voted=#{voted}, commented=#{commented}, images=#{images}, update_time=#{updateTime} WHERE id=#{id}")
    void update(Comment comment);
    
    @Update("UPDATE COMMENT SET is_deleted=1, update_time=CURRENT_TIMESTAMP WHERE id=#{id}")
    void delete(@Param("id") Long id);
    
    @Select("SELECT COUNT(*) FROM COMMENT WHERE is_deleted = 0")
    Long countAll();
}

