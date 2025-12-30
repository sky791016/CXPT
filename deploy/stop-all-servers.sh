#!/bin/bash

# 停止所有服务器脚本

echo "=========================================="
echo "停止所有服务器"
echo "=========================================="

# 停止所有相关进程
echo "正在停止服务..."

# 停止前端服务 (Vite)
pkill -f "vite.*2000" 2>/dev/null
pkill -f "vite.*2001" 2>/dev/null
pkill -f "vite.*2002" 2>/dev/null

# 停止后端服务
pkill -f "spring-boot:run" 2>/dev/null
pkill -f "VoiceCommunityApplication" 2>/dev/null
pkill -f "AdminApplication" 2>/dev/null

# 通过端口杀死进程
for port in 2000 2001 2002 8081 8082; do
    PID=$(lsof -ti:${port} 2>/dev/null)
    if [ ! -z "$PID" ]; then
        kill -9 $PID 2>/dev/null
        echo "  已停止端口 ${port} 上的进程 (PID: ${PID})"
    fi
done

sleep 2

echo "✅ 所有服务已停止"
echo "=========================================="

