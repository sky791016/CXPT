#!/bin/bash

# 语音社区前端部署脚本
# 使用方法: ./deploy-frontend.sh [环境]
# 环境: dev/test/prod (默认: dev)

ENV=${1:-dev}
PROJECT_NAME="voice_community_fe"
DEPLOY_DIR="/web"
NGINX_DIR="/usr/local/nginx"
BACKUP_DIR="/web_backup"

echo "=========================================="
echo "开始部署 ${PROJECT_NAME} - ${ENV} 环境"
echo "=========================================="

# 1. 检查Node.js环境
echo "检查Node.js环境..."
if ! command -v node &> /dev/null; then
    echo "错误: Node.js 未安装或未在PATH中"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "Node.js版本: ${NODE_VERSION}"

# 2. 检查npm
if ! command -v npm &> /dev/null; then
    echo "错误: npm 未安装或未在PATH中"
    exit 1
fi

# 3. 进入项目目录
echo "进入项目目录..."
cd "$(dirname "$0")/../voice_community_fe" || exit 1

# 4. 安装依赖
echo "安装依赖..."
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "错误: npm install 失败"
        exit 1
    fi
fi

# 5. 构建项目
echo "构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "错误: 构建失败"
    exit 1
fi

# 6. 检查构建产物
if [ ! -d "dist" ]; then
    echo "错误: dist 目录不存在"
    exit 1
fi

echo "构建成功: dist/"

# 7. 备份旧文件（如果存在）
if [ -d "${DEPLOY_DIR}" ] && [ "$(ls -A ${DEPLOY_DIR})" ]; then
    echo "备份旧文件..."
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
    sudo mkdir -p ${BACKUP_DIR}
    sudo cp -r ${DEPLOY_DIR} ${BACKUP_DIR}/${BACKUP_NAME}
    echo "备份完成: ${BACKUP_DIR}/${BACKUP_NAME}"
fi

# 8. 清理部署目录
echo "清理部署目录..."
sudo rm -rf ${DEPLOY_DIR}/*

# 9. 复制新文件
echo "复制新文件..."
sudo cp -r dist/* ${DEPLOY_DIR}/
sudo chown -R nginx:nginx ${DEPLOY_DIR} 2>/dev/null || sudo chown -R www-data:www-data ${DEPLOY_DIR}

# 10. 检查nginx配置
echo "检查nginx配置..."
if [ ! -f "${NGINX_DIR}/conf/nginx.conf" ]; then
    echo "警告: nginx配置文件不存在: ${NGINX_DIR}/conf/nginx.conf"
    echo "请确保nginx已正确配置"
else
    # 测试nginx配置
    sudo ${NGINX_DIR}/sbin/nginx -t
    if [ $? -eq 0 ]; then
        # 重载nginx
        echo "重载nginx配置..."
        sudo ${NGINX_DIR}/sbin/nginx -s reload
        echo "nginx已重载"
    else
        echo "错误: nginx配置测试失败，请检查配置文件"
        exit 1
    fi
fi

echo "=========================================="
echo "部署成功!"
echo "部署目录: ${DEPLOY_DIR}"
echo "=========================================="
echo "如果nginx未自动重载，请手动执行:"
echo "sudo ${NGINX_DIR}/sbin/nginx -s reload"




