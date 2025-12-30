#!/bin/bash

# 本地开发环境启动后端服务脚本

PROJECT_NAME="voice_community_backend"
JAR_NAME="${PROJECT_NAME}-0.0.1-SNAPSHOT.jar"

echo "=========================================="
echo "启动 ${PROJECT_NAME} (本地开发环境)"
echo "=========================================="

# 进入项目目录
cd "$(dirname "$0")/../voice_community_backend" || exit 1

# 检查Java环境
if ! command -v java &> /dev/null; then
    echo "错误: Java 未安装或未在PATH中"
    echo "请安装 Java 21"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1)
echo "Java版本: ${JAVA_VERSION}"

# 检查Maven环境
if ! command -v mvn &> /dev/null; then
    echo "错误: Maven 未安装或未在PATH中"
    exit 1
fi

# 检查JAR文件是否存在，如果不存在则构建
if [ ! -f "target/${JAR_NAME}" ]; then
    echo "JAR文件不存在，开始构建..."
    mvn clean package -DskipTests
    if [ $? -ne 0 ]; then
        echo "错误: Maven构建失败"
        exit 1
    fi
fi

# 创建必要的目录
mkdir -p logs
mkdir -p temp

# 停止旧进程（如果存在）
OLD_PID=$(jps -l | grep ${JAR_NAME} | awk '{print $1}')
if [ -n "$OLD_PID" ]; then
    echo "停止旧进程 PID: ${OLD_PID}"
    kill -15 ${OLD_PID}
    sleep 2
fi

# 启动服务
echo "启动服务..."
java -jar \
    -Xms256m \
    -Xmx512m \
    target/${JAR_NAME} > logs/app.log 2>&1 &

NEW_PID=$!
sleep 2

# 检查服务是否启动成功
if ps -p ${NEW_PID} > /dev/null 2>&1; then
    echo "=========================================="
    echo "服务启动成功!"
    echo "进程PID: ${NEW_PID}"
    echo "访问地址: http://localhost:8081"
    echo "查看日志: tail -f logs/app.log"
    echo "停止服务: kill -15 ${NEW_PID}"
    echo "=========================================="
else
    echo "错误: 服务启动失败，请检查日志: logs/app.log"
    exit 1
fi




