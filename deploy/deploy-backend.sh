#!/bin/bash

# 语音社区后端部署脚本
# 使用方法: ./deploy-backend.sh [环境]
# 环境: dev/test/prod (默认: dev)

ENV=${1:-dev}
PROJECT_NAME="voice_community_backend"
JAR_NAME="${PROJECT_NAME}-0.0.1-SNAPSHOT.jar"
DEPLOY_DIR="/opt/voice_community_be"
JAVA_HOME="/usr/local/java/jdk-21.0.3"
LOG_DIR="./logs"
TEMP_DIR="./temp"

echo "=========================================="
echo "开始部署 ${PROJECT_NAME} - ${ENV} 环境"
echo "=========================================="

# 1. 检查Java环境
echo "检查Java环境..."
if [ ! -f "${JAVA_HOME}/bin/java" ]; then
    echo "错误: Java 21 未安装在 ${JAVA_HOME}"
    exit 1
fi

JAVA_VERSION=$(${JAVA_HOME}/bin/java -version 2>&1 | head -n 1)
echo "Java版本: ${JAVA_VERSION}"

# 2. 检查Maven环境
echo "检查Maven环境..."
if ! command -v mvn &> /dev/null; then
    echo "错误: Maven 未安装或未在PATH中"
    exit 1
fi

# 3. 清理并构建项目
echo "清理并构建项目..."
cd "$(dirname "$0")/../voice_community_backend" || exit 1

mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "错误: Maven构建失败"
    exit 1
fi

# 4. 检查JAR文件是否存在
if [ ! -f "target/${JAR_NAME}" ]; then
    echo "错误: JAR文件不存在: target/${JAR_NAME}"
    exit 1
fi

echo "构建成功: target/${JAR_NAME}"

# 5. 创建部署目录
echo "创建部署目录..."
sudo mkdir -p ${DEPLOY_DIR}
sudo mkdir -p ${LOG_DIR}
sudo mkdir -p ${TEMP_DIR}

# 6. 停止旧服务
echo "停止旧服务..."
OLD_PID=$(${JAVA_HOME}/bin/jps -l | grep ${JAR_NAME} | awk '{print $1}')
if [ -n "$OLD_PID" ]; then
    echo "找到运行中的进程 PID: ${OLD_PID}, 正在停止..."
    kill -15 ${OLD_PID}
    sleep 5
    
    # 检查是否还在运行
    if ps -p ${OLD_PID} > /dev/null 2>&1; then
        echo "进程仍在运行，强制停止..."
        kill -9 ${OLD_PID}
        sleep 2
    fi
    echo "服务已停止"
else
    echo "未找到运行中的服务"
fi

# 7. 备份旧JAR（如果存在）
if [ -f "${DEPLOY_DIR}/${JAR_NAME}" ]; then
    BACKUP_NAME="${JAR_NAME}.backup.$(date +%Y%m%d_%H%M%S)"
    echo "备份旧JAR: ${BACKUP_NAME}"
    sudo cp ${DEPLOY_DIR}/${JAR_NAME} ${DEPLOY_DIR}/${BACKUP_NAME}
fi

# 8. 复制新JAR文件
echo "复制新JAR文件..."
sudo cp target/${JAR_NAME} ${DEPLOY_DIR}/
sudo chmod +x ${DEPLOY_DIR}/${JAR_NAME}

# 9. 检查配置文件
echo "检查配置文件..."
if [ ! -f "${DEPLOY_DIR}/application.yml" ]; then
    echo "警告: application.yml 不存在，请确保已配置数据库连接"
fi

# 10. 启动服务
echo "启动服务..."
cd ${DEPLOY_DIR}
sudo nohup ${JAVA_HOME}/bin/java -jar \
    -Xms512m \
    -Xmx1024m \
    -Dspring.profiles.active=${ENV} \
    ${JAR_NAME} > ${LOG_DIR}/app.log 2>&1 &

NEW_PID=$!
sleep 3

# 11. 检查服务是否启动成功
if ps -p ${NEW_PID} > /dev/null 2>&1; then
    echo "=========================================="
    echo "部署成功!"
    echo "进程PID: ${NEW_PID}"
    echo "JAR文件: ${DEPLOY_DIR}/${JAR_NAME}"
    echo "日志目录: ${LOG_DIR}"
    echo "=========================================="
    echo "查看日志: tail -f ${LOG_DIR}/app.log"
    echo "停止服务: kill -15 ${NEW_PID}"
else
    echo "错误: 服务启动失败，请检查日志: ${LOG_DIR}/app.log"
    exit 1
fi




