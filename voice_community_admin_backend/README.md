# 后台管理系统后端

创新平台后台管理系统后端，基于 Spring Boot 3 + MyBatis 构建。

## 功能特性

- ✅ 用户管理（增删改查、统计）
- ✅ 心声管理（增删改查、统计）
- ✅ 数据统计API
- 🔄 评论管理（待实现）
- 🔄 标签管理（待实现）
- 🔄 勋章管理（待实现）
- 🔄 任务板管理（待实现）

## 技术栈

- Spring Boot 3.3.7
- Java 21
- MyBatis 3.0.4
- SQLite（共享数据库）
- PageHelper（分页）

## 配置

配置文件：`src/main/resources/application.yml`

- 端口：8082
- 数据库：共享 `../voice_community_backend/data/voice_community.db`

## 启动

```bash
mvn clean package -DskipTests
java -jar target/voice_community_admin_backend-0.0.1-SNAPSHOT.jar
```

## API 文档

### 用户管理

- `GET /admin/api/user/list` - 用户列表（分页）
- `GET /admin/api/user/{id}` - 用户详情
- `POST /admin/api/user/create` - 创建用户
- `PUT /admin/api/user/update/{id}` - 更新用户
- `DELETE /admin/api/user/delete/{id}` - 删除用户
- `GET /admin/api/user/statistics` - 用户统计

### 心声管理

- `GET /admin/api/voice/list` - 心声列表（分页）
- `GET /admin/api/voice/{id}` - 心声详情
- `POST /admin/api/voice/create` - 创建心声
- `PUT /admin/api/voice/update/{id}` - 更新心声
- `DELETE /admin/api/voice/delete/{id}` - 删除心声
- `GET /admin/api/voice/statistics` - 心声统计

### 统计

- `GET /admin/api/statistics/overview` - 总览统计

