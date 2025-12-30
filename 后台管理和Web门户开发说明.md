# 后台管理和Web门户开发说明

本文档说明已创建的后台管理系统和Web门户的基础架构，以及如何扩展功能。

## 项目结构

```
CXPT/
├── voice_community_backend/          # 主后端服务（端口8081）
├── voice_community_fe/               # 移动端前端（端口5173）
├── voice_community_admin_backend/    # 后台管理后端（端口8082）✨ 新建
├── voice_community_admin_fe/         # 后台管理前端（端口3000）✨ 新建
└── voice_community_web/              # Web门户前端（端口5174）✨ 新建
```

## 后台管理系统

### 后端（voice_community_admin_backend）

**技术栈**: Spring Boot 3 + MyBatis + SQLite

**已实现功能**:
- ✅ 用户管理（增删改查、统计）
- ✅ 心声管理（增删改查、统计）
- ✅ 评论管理（增删改查、统计）
- ✅ 标签管理（增删改查、统计）
- ✅ 勋章管理（增删改查、统计）
- ✅ 数据统计API（总览统计包含所有实体数据）
- ✅ CORS配置
- ✅ 分页支持

**核心文件**:
- `AdminApplication.java` - 主启动类
- `config/CorsConfig.java` - CORS配置
- `controller/AdminUserController.java` - 用户管理API
- `controller/AdminVoiceController.java` - 心声管理API
- `controller/AdminCommentController.java` - 评论管理API
- `controller/AdminTagController.java` - 标签管理API
- `controller/AdminMedalController.java` - 勋章管理API
- `controller/AdminStatisticsController.java` - 统计API
- `service/` - 服务层
- `mapper/` - 数据访问层

**API端点**:

- **用户管理**: `/admin/api/user/*`
- **心声管理**: `/admin/api/voice/*`
- **评论管理**: `/admin/api/comment/*`
- **标签管理**: `/admin/api/tag/*`
- **勋章管理**: `/admin/api/medal/*`
- **统计**: `/admin/api/statistics/*`

每个实体都支持：
- `GET /list` - 列表（分页）
- `GET /{id}` - 详情
- `POST /create` - 创建
- `PUT /update/{id}` - 更新
- `DELETE /delete/{id}` - 删除
- `GET /statistics` - 统计

**如何扩展其他实体管理**:

1. 确保实体类在 `pojo/entity/`（已从主后端复制）

2. 创建Mapper接口（参考 `AdminUserMapper.java`）:
```java
@Mapper
public interface AdminXxxMapper {
    @Select("SELECT * FROM xxx WHERE ...")
    List<Xxx> selectAll(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM xxx WHERE id = #{id}")
    Xxx selectById(Long id);
    
    @Insert("INSERT INTO xxx ...")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Xxx xxx);
    
    @Update("UPDATE xxx SET ... WHERE id=#{id}")
    void update(Xxx xxx);
    
    @Delete("DELETE FROM xxx WHERE id=#{id}")
    void delete(Long id);
    
    @Select("SELECT COUNT(*) FROM xxx")
    Long countAll();
}
```

3. 创建Service接口和实现（参考 `AdminUserService` 和 `AdminUserServiceImpl`）

4. 创建Controller（参考 `AdminUserController.java`）

5. 在 `AdminStatisticsServiceImpl` 中添加统计信息

**启动方式**:
```bash
cd deploy
./start-admin-backend-local.sh
```

访问: http://localhost:8082

### 前端（voice_community_admin_fe）

**技术栈**: React + TypeScript + Ant Design 5

**已实现功能**:
- ✅ 用户管理页面（列表、创建、编辑、删除）
- ✅ 心声管理页面（列表、创建、编辑、删除）
- ✅ 数据统计页面
- ✅ 侧边栏导航
- ✅ 响应式布局

**待扩展功能**:
- 🔄 评论管理页面
- 🔄 标签管理页面
- 🔄 勋章管理页面
- 🔄 其他实体管理页面

**如何扩展其他实体管理页面**:

1. 在 `src/api/` 创建API文件（参考 `userApi.ts`）

2. 在 `src/types/` 创建类型定义（参考 `user.ts`）

3. 在 `src/pages/` 创建管理页面（参考 `UserManagement.tsx`）

4. 在 `Sidebar.tsx` 添加菜单项

5. 在 `App.tsx` 添加路由

**启动方式**:
```bash
cd deploy
./start-admin-frontend-local.sh
```

访问: http://localhost:3000

## Web门户（voice_community_web）

**技术栈**: React + TypeScript + Vite

**当前状态**: 基础框架已创建，功能待开发

**计划功能**:
- 🔄 首页展示
- 🔄 心声列表
- 🔄 心声详情
- 🔄 用户中心
- 🔄 勋章展示

**启动方式**:
```bash
cd deploy
./start-web-portal-local.sh
```

访问: http://localhost:5174

## 数据库共享

所有服务共享同一套数据库：
- 数据库文件: `voice_community_backend/data/voice_community.db`
- 后台管理后端配置: `jdbc:sqlite:../voice_community_backend/data/voice_community.db`

## API端点汇总

### 后台管理后端（端口8082）

**用户管理**:
- `GET /admin/api/user/list` - 用户列表
- `GET /admin/api/user/{id}` - 用户详情
- `POST /admin/api/user/create` - 创建用户
- `PUT /admin/api/user/update/{id}` - 更新用户
- `DELETE /admin/api/user/delete/{id}` - 删除用户
- `GET /admin/api/user/statistics` - 用户统计

**心声管理**:
- `GET /admin/api/voice/list` - 心声列表
- `GET /admin/api/voice/{id}` - 心声详情
- `POST /admin/api/voice/create` - 创建心声
- `PUT /admin/api/voice/update/{id}` - 更新心声
- `DELETE /admin/api/voice/delete/{id}` - 删除心声
- `GET /admin/api/voice/statistics` - 心声统计

**评论管理**:
- `GET /admin/api/comment/list` - 评论列表
- `GET /admin/api/comment/{id}` - 评论详情
- `POST /admin/api/comment/create` - 创建评论
- `PUT /admin/api/comment/update/{id}` - 更新评论
- `DELETE /admin/api/comment/delete/{id}` - 删除评论
- `GET /admin/api/comment/statistics` - 评论统计

**标签管理**:
- `GET /admin/api/tag/list` - 标签列表
- `GET /admin/api/tag/all` - 所有标签（不分页）
- `GET /admin/api/tag/{id}` - 标签详情
- `POST /admin/api/tag/create` - 创建标签
- `PUT /admin/api/tag/update/{id}` - 更新标签
- `DELETE /admin/api/tag/delete/{id}` - 删除标签
- `GET /admin/api/tag/statistics` - 标签统计

**勋章管理**:
- `GET /admin/api/medal/list` - 勋章列表
- `GET /admin/api/medal/{id}` - 勋章详情
- `POST /admin/api/medal/create` - 创建勋章
- `PUT /admin/api/medal/update/{id}` - 更新勋章
- `DELETE /admin/api/medal/delete/{id}` - 删除勋章
- `GET /admin/api/medal/statistics` - 勋章统计

**统计**:
- `GET /admin/api/statistics/overview` - 总览统计（包含所有实体数据）

### 主后端（端口8081）

原有API保持不变，Web门户使用主后端的API。

## 下一步开发建议

1. **完善后台管理前端**:
   - 实现评论管理页面
   - 实现标签管理页面
   - 实现勋章管理页面
   - 实现任务板管理页面
   - 实现项目管理页面
   - 完善统计功能（趋势图表等）

2. **开发Web门户**:
   - 参考移动端前端代码
   - 实现首页、列表、详情页
   - 实现用户中心
   - 实现勋章展示

3. **优化和扩展**:
   - 添加权限控制
   - 添加日志记录
   - 添加操作审计
   - 优化UI/UX
   - 添加数据导出功能
   - 添加批量操作功能

## 注意事项

1. 所有服务使用同一套数据库，注意数据一致性
2. 后台管理API使用 `/admin/api` 前缀，与主后端API区分
3. Web门户使用主后端API（`/api`），无需修改主后端代码
4. 开发时注意CORS配置，确保前端可以正常访问后端API
5. SQLite使用 `||` 进行字符串连接，而非 `+` 或 `CONCAT`
6. SQLite的布尔值使用INTEGER类型（0或1）
