#!/bin/bash
echo "🔄 重启后端服务以加载修复后的 XML 文件..."
echo ""

# 停止当前运行的后端服务
echo "1. 停止后端服务..."
ps aux | grep "voice_community_backend.*jar" | grep -v grep | awk '{print $2}' | xargs kill -15 2>/dev/null
sleep 3

# 检查是否还有进程
REMAINING=$(ps aux | grep "voice_community_backend.*jar" | grep -v grep | wc -l)
if [ $REMAINING -gt 0 ]; then
    echo "⚠️  仍有进程运行，强制停止..."
    ps aux | grep "voice_community_backend.*jar" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null
    sleep 2
fi

# 启动后端服务
echo "2. 启动后端服务..."
cd voice_community_backend
nohup java -jar target/voice_community_backend-0.0.1-SNAPSHOT.jar > logs/app.log 2>&1 &

# 等待启动
sleep 5

# 检查服务状态
echo "3. 检查服务状态..."
if ps aux | grep "voice_community_backend.*jar" | grep -v grep > /dev/null; then
    echo "✅ 后端服务已启动"
    echo ""
    echo "📋 服务信息："
    ps aux | grep "voice_community_backend.*jar" | grep -v grep
    echo ""
    echo "📝 查看日志："
    echo "tail -f voice_community_backend/logs/app.log"
else
    echo "❌ 后端服务启动失败，请检查日志"
    echo "tail -f voice_community_backend/logs/app.log"
fi
