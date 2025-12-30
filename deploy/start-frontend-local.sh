#!/bin/bash

# 本地开发环境启动前端服务脚本

PROJECT_NAME="voice_community_fe"

echo "=========================================="
echo "启动 ${PROJECT_NAME} (本地开发环境)"
echo "=========================================="

# 进入项目目录
cd "$(dirname "$0")/../voice_community_fe" || exit 1

# 检查Node.js环境
if ! command -v node &> /dev/null; then
    echo "错误: Node.js 未安装"
    echo "请安装 Node.js (推荐版本: 18+)"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "Node.js版本: ${NODE_VERSION}"

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "错误: npm 未安装"
    exit 1
fi

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    echo "依赖未安装，开始安装..."
    npm install
    if [ $? -ne 0 ]; then
        echo "错误: npm install 失败"
        exit 1
    fi
fi

# 启动开发服务器
echo "启动开发服务器..."
echo "前端地址: http://localhost:5173 (或查看终端输出)"
echo "API代理: /api -> http://localhost:8081"
echo ""
echo "按 Ctrl+C 停止服务"
echo "=========================================="

npm run dev





