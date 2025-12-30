# 修改日志

## 2025-12-30

### 创建后台管理系统和Web门户

#### 1. 后台管理系统后端（voice_community_admin_backend）
- 创建新的Spring Boot项目
- 端口：8082
- 使用同一套数据库（SQLite）
- 实现功能：
  - 用户管理API（增删改查、统计）
  - 心声管理API（增删改查、统计）
  - 数据统计API
  - CORS配置
  - 分页支持（PageHelper）

#### 2. 后台管理前端（voice_community_admin_fe）
- 创建React + TypeScript + Ant Design项目
- 端口：3000
- 实现功能：
  - 用户管理页面（列表、创建、编辑、删除）
  - 心声管理页面（列表、创建、编辑、删除）
  - 数据统计页面
  - 侧边栏导航
  - 响应式布局

#### 3. Web门户前端（voice_community_web）
- 创建React + TypeScript项目
- 端口：5174
- 基础框架已创建，功能待开发

#### 4. 部署脚本
- `deploy/start-admin-backend-local.sh` - 启动后台管理后端
- `deploy/start-admin-frontend-local.sh` - 启动后台管理前端
- `deploy/start-web-portal-local.sh` - 启动Web门户前端

#### 5. 文档
- `后台管理和Web门户开发说明.md` - 详细的开发说明文档

### 技术栈

**后台管理后端**:
- Spring Boot 3.3.7
- Java 21
- MyBatis 3.0.4
- SQLite
- PageHelper

**后台管理前端**:
- React 18
- TypeScript
- Ant Design 5
- Vite

**Web门户前端**:
- React 18
- TypeScript
- Vite

### 文件结构

```
voice_community_admin_backend/
├── pom.xml
├── src/main/java/com/vc/admin/
│   ├── AdminApplication.java
│   ├── config/CorsConfig.java
│   ├── controller/
│   │   ├── AdminUserController.java
│   │   ├── AdminVoiceController.java
│   │   └── AdminStatisticsController.java
│   ├── service/
│   │   ├── AdminUserService.java
│   │   ├── AdminUserServiceImpl.java
│   │   ├── AdminVoiceService.java
│   │   ├── AdminVoiceServiceImpl.java
│   │   ├── AdminStatisticsService.java
│   │   └── AdminStatisticsServiceImpl.java
│   ├── mapper/
│   │   ├── AdminUserMapper.java
│   │   └── AdminVoiceMapper.java
│   └── pojo/
│       ├── entity/ (从主后端复制)
│       └── dto/
└── src/main/resources/
    ├── application.yml
    └── mybatis-config.xml

voice_community_admin_fe/
├── package.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── api/
│   │   ├── userApi.ts
│   │   ├── voiceApi.ts
│   │   └── statisticsApi.ts
│   ├── pages/
│   │   ├── UserManagement.tsx
│   │   ├── VoiceManagement.tsx
│   │   └── Statistics.tsx
│   ├── components/Layout/
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── types/
│       ├── user.ts
│       └── voice.ts

voice_community_web/
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx
    └── pages/
        └── Home.tsx
```

### 下一步

1. 完善后台管理的其他实体管理功能（评论、标签、勋章、任务板等）
2. 开发Web门户的具体功能
3. 添加权限控制和日志记录
4. 优化UI/UX

