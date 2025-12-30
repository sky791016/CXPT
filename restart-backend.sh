#!/bin/bash

# 重启后端服务脚本
# 用于加载修复后的 MyBatis XML 文件

echo "🔄 正在重启后端服务..."

# 1. 停止主后端服务
echo "1. 停止主后端服务（端口 8081）..."
PID=$(ps aux | grep "voice_community_backend.*jar" | grep -v grep | awk '{print $2}')
if [ ! -z "$PID" ]; then
    echo "   找到进程 PID: $PID"
    kill -15 $PID
    echo "   已发送停止信号"
    sleep 3
else
    echo "   未找到运行中的服务"
fi

# 2. 停止管理后端服务
echo "2. 停止管理后端服务（端口 8082）..."
ADMIN_PID=$(ps aux | grep "voice_community_admin_backend.*jar" | grep -v grep | awk '{print $2}')
if [ ! -z "$ADMIN_PID" ]; then
    echo "   找到进程 PID: $ADMIN_PID"
    kill -15 $ADMIN_PID
    echo "   已发送停止信号"
    sleep 2
else
    echo "   未找到运行中的服务"
fi

# 3. 确保文件已复制到 target 目录
echo "3. 确保修复后的文件已复制..."
cd voice_community_backend
if [ -d "target/classes/com/vc/mapper" ]; then
    cp -f src/main/java/com/vc/mapper/CommentMapper.xml target/classes/com/vc/mapper/CommentMapper.xml
    echo "   ✅ CommentMapper.xml 已更新"
fi
cd ..

# 4. 启动主后端服务
echo "4. 启动主后端服务..."
cd voice_community_backend
nohup java -jar target/voice_community_backend-0.0.1-SNAPSHOT.jar > logs/app.log 2>&1 &
sleep 2
cd ..

# 5. 启动管理后端服务
echo "5. 启动管理后端服务..."
cd voice_community_admin_backend
nohup java -jar target/voice_community_admin_backend-0.0.1-SNAPSHOT.jar > logs/app.log 2>&1 &
sleep 2
cd ..

# 6. 验证服务状态
echo ""
echo "6. 验证服务状态..."
sleep 3

MAIN_PID=$(ps aux | grep "voice_community_backend.*jar" | grep -v grep | awk '{print $2}')
ADMIN_PID=$(ps aux | grep "voice_community_admin_backend.*jar" | grep -v grep | awk '{print $2}')

if [ ! -z "$MAIN_PID" ]; then
    echo "   ✅ 主后端服务已启动 (PID: $MAIN_PID)"
else
    echo "   ❌ 主后端服务启动失败"
fi

if [ ! -z "$ADMIN_PID" ]; then
    echo "   ✅ 管理后端服务已启动 (PID: $ADMIN_PID)"
else
    echo "   ❌ 管理后端服务启动失败"
fi

echo ""
echo "✅ 重启完成！"
echo ""
echo "📋 检查日志："
echo "   主后端: tail -f voice_community_backend/logs/app.log"
echo "   管理后端: tail -f voice_community_admin_backend/logs/app.log"
echo ""
echo "🧪 测试评论 API："
echo "   curl 'http://localhost:8081/api/comment/getAllCommentByVoiceId?pageNum=1&pageSize=10&voiceId=73&orderBy=update_time'"

