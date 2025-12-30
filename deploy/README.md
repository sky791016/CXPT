# 部署脚本说明

本目录包含语音社区系统的所有部署相关脚本和配置文件。

## 📁 文件说明

### 部署脚本
- **deploy-backend.sh** - 后端服务器部署脚本
- **deploy-frontend.sh** - 前端服务器部署脚本
- **start-backend-local.sh** - 后端本地开发启动脚本
- **start-frontend-local.sh** - 前端本地开发启动脚本

### 配置文件
- **nginx.conf.example** - Nginx配置示例文件

### 文档
- **部署指南.md** - 详细部署文档
- **快速启动.md** - 快速启动指南

## 🚀 快速开始

### 本地开发
```bash
# 启动后端
./start-backend-local.sh

# 启动前端（新终端）
./start-frontend-local.sh
```

### 服务器部署
```bash
# 部署后端
./deploy-backend.sh dev

# 部署前端
./deploy-frontend.sh dev
```

## 📖 详细文档

请查看：
- [快速启动.md](./快速启动.md) - 快速上手指南
- [部署指南.md](./部署指南.md) - 完整部署文档

## ⚠️ 注意事项

1. **首次使用前**，请确保脚本有执行权限：
   ```bash
   chmod +x *.sh
   ```

2. **部署前**，请检查并修改配置文件：
   - 后端：`../voice_community_backend/src/main/resources/application.yml`
   - 后端：`../voice_community_backend/conf/flyway.conf`
   - 前端：`../voice_community_fe/vite.config.ts` (如需要)

3. **服务器部署**需要sudo权限，请确保当前用户有相应权限。

4. **数据库**需要提前配置好，并执行Flyway迁移。





