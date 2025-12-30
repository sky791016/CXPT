package com.vc.admin.mapper;

import com.vc.admin.pojo.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdminUserMapper {
    
    @Select("SELECT * FROM USER WHERE is_deleted = 0 " +
            "AND (#{keyword} IS NULL OR #{keyword} = '' OR user_name LIKE '%' || #{keyword} || '%' OR full_name LIKE '%' || #{keyword} || '%') " +
            "ORDER BY create_time DESC")
    List<User> selectAll(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM USER WHERE id = #{id} AND is_deleted = 0")
    User selectById(Long id);
    
    @Insert("INSERT INTO USER (user_name, full_name, signature, openid, avatar, voted, created, commented, score, active, is_deleted, is_leader, create_time, update_time) " +
            "VALUES (#{userName}, #{fullName}, #{signature}, #{openId}, #{avatar}, #{voted}, #{created}, #{commented}, #{score}, #{active}, #{isDeleted}, #{isLeader}, #{createTime}, #{updateTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(User user);
    
    @Update("UPDATE USER SET user_name=#{userName}, full_name=#{fullName}, signature=#{signature}, avatar=#{avatar}, " +
            "voted=#{voted}, created=#{created}, commented=#{commented}, score=#{score}, active=#{active}, " +
            "is_leader=#{isLeader}, update_time=#{updateTime} WHERE id=#{id}")
    void update(User user);
    
    @Update("UPDATE USER SET is_deleted=1, update_time=CURRENT_TIMESTAMP WHERE id=#{id}")
    void delete(Long id);
    
    @Select("SELECT COUNT(*) FROM USER WHERE is_deleted = 0")
    Long countAll();
    
    @Select("SELECT COUNT(*) FROM USER WHERE is_deleted = 0 AND active = 1")
    Long countActive();
    
    @Select("SELECT COUNT(*) FROM USER WHERE is_deleted = 0 AND is_leader = 1")
    Long countLeaders();
}
