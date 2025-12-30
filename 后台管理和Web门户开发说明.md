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
- ✅ 数据统计API
- ✅ CORS配置
- ✅ 分页支持

**核心文件**:
- `AdminApplication.java` - 主启动类
- `config/CorsConfig.java` - CORS配置
- `controller/AdminUserController.java` - 用户管理API
- `controller/AdminVoiceController.java` - 心声管理API
- `controller/AdminStatisticsController.java` - 统计API
- `service/` - 服务层
- `mapper/` - 数据访问层

**如何扩展其他实体管理**:

1. 复制实体类到 `pojo/entity/`（已从主后端复制）

2. 创建Mapper接口（参考 `AdminUserMapper.java`）:
```java
@Mapper
public interface AdminXxxMapper {
    List<Xxx> selectAll(String keyword);
    Xxx selectById(Long id);
    void insert(Xxx xxx);
    void update(Xxx xxx);
    void delete(Long id);
    Long countAll();
}
```

3. 创建Service接口和实现（参考 `AdminUserService` 和 `AdminUserServiceImpl`）

4. 创建Controller（参考 `AdminUserController.java`）

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

**核心文件**:
- `src/App.tsx` - 主应用
- `src/pages/UserManagement.tsx` - 用户管理页面
- `src/pages/VoiceManagement.tsx` - 心声管理页面
- `src/pages/Statistics.tsx` - 统计页面
- `src/api/` - API调用
- `src/types/` - TypeScript类型定义

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

- `GET /admin/api/user/list` - 用户列表
- `GET /admin/api/user/{id}` - 用户详情
- `POST /admin/api/user/create` - 创建用户
- `PUT /admin/api/user/update/{id}` - 更新用户
- `DELETE /admin/api/user/delete/{id}` - 删除用户
- `GET /admin/api/user/statistics` - 用户统计

- `GET /admin/api/voice/list` - 心声列表
- `GET /admin/api/voice/{id}` - 心声详情
- `POST /admin/api/voice/create` - 创建心声
- `PUT /admin/api/voice/update/{id}` - 更新心声
- `DELETE /admin/api/voice/delete/{id}` - 删除心声
- `GET /admin/api/voice/statistics` - 心声统计

- `GET /admin/api/statistics/overview` - 总览统计

### 主后端（端口8081）

原有API保持不变，Web门户使用主后端的API。

## 下一步开发建议

1. **完善后台管理功能**:
   - 实现评论管理
   - 实现标签管理
   - 实现勋章管理
   - 实现任务板管理
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

## 注意事项

1. 所有服务使用同一套数据库，注意数据一致性
2. 后台管理API使用 `/admin/api` 前缀，与主后端API区分
3. Web门户使用主后端API（`/api`），无需修改主后端代码
4. 开发时注意CORS配置，确保前端可以正常访问后端API

