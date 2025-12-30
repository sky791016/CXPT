#!/bin/bash

# 启动所有服务器脚本
# 前端端口: 2000, 2001, 2002
# 后端端口: 8081, 8082

BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="${BASE_DIR}/logs"

# 创建日志目录
mkdir -p "${LOG_DIR}"

echo "=========================================="
echo "启动所有服务器"
echo "=========================================="
echo ""
echo "端口配置:"
echo "  - 移动端前端: 2000"
echo "  - 后台管理前端: 2001"
echo "  - Web门户前端: 2002"
echo "  - 主后端服务: 8081"
echo "  - 管理后端服务: 8082"
echo ""
echo "日志目录: ${LOG_DIR}"
echo ""

# 函数：检查端口是否被占用
check_port() {
    local port=$1
    if lsof -Pi :${port} -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  端口 ${port} 已被占用"
        return 1
    else
        return 0
    fi
}

# 检查所有端口
echo "检查端口占用情况..."
check_port 2000 || exit 1
check_port 2001 || exit 1
check_port 2002 || exit 1
check_port 8081 || exit 1
check_port 8082 || exit 1
echo "✅ 所有端口可用"
echo ""

# 启动主后端服务 (8081)
echo "1️⃣ 启动主后端服务 (端口 8081)..."
cd "${BASE_DIR}/voice_community_backend" || exit 1
if [ -f "target/voice_community_backend-0.0.1-SNAPSHOT.jar" ]; then
    nohup java -jar target/voice_community_backend-0.0.1-SNAPSHOT.jar > "${LOG_DIR}/backend-8081.log" 2>&1 &
    BACKEND_PID=$!
    echo "   主后端服务启动中 (PID: ${BACKEND_PID})"
else
    echo "   ⚠️  JAR文件不存在，使用 Maven 启动..."
    nohup mvn spring-boot:run > "${LOG_DIR}/backend-8081.log" 2>&1 &
    BACKEND_PID=$!
    echo "   主后端服务启动中 (PID: ${BACKEND_PID})"
fi
sleep 3

# 启动管理后端服务 (8082)
echo "2️⃣ 启动管理后端服务 (端口 8082)..."
cd "${BASE_DIR}/voice_community_admin_backend" || exit 1
if [ -f "target/voice_community_admin_backend-0.0.1-SNAPSHOT.jar" ]; then
    nohup java -jar target/voice_community_admin_backend-0.0.1-SNAPSHOT.jar > "${LOG_DIR}/backend-8082.log" 2>&1 &
    ADMIN_BACKEND_PID=$!
    echo "   管理后端服务启动中 (PID: ${ADMIN_BACKEND_PID})"
else
    echo "   ⚠️  JAR文件不存在，使用 Maven 启动..."
    nohup mvn spring-boot:run > "${LOG_DIR}/backend-8082.log" 2>&1 &
    ADMIN_BACKEND_PID=$!
    echo "   管理后端服务启动中 (PID: ${ADMIN_BACKEND_PID})"
fi
sleep 3

# 启动移动端前端 (2000)
echo "3️⃣ 启动移动端前端 (端口 2000)..."
cd "${BASE_DIR}/voice_community_fe" || exit 1
nohup npm run dev > "${LOG_DIR}/frontend-2000.log" 2>&1 &
FRONTEND_2000_PID=$!
echo "   移动端前端启动中 (PID: ${FRONTEND_2000_PID})"
sleep 3

# 启动后台管理前端 (2001)
echo "4️⃣ 启动后台管理前端 (端口 2001)..."
cd "${BASE_DIR}/voice_community_admin_fe" || exit 1
nohup npm run dev > "${LOG_DIR}/frontend-2001.log" 2>&1 &
FRONTEND_2001_PID=$!
echo "   后台管理前端启动中 (PID: ${FRONTEND_2001_PID})"
sleep 3

# 启动Web门户前端 (2002)
echo "5️⃣ 启动Web门户前端 (端口 2002)..."
cd "${BASE_DIR}/voice_community_web" || exit 1
nohup npm run dev > "${LOG_DIR}/frontend-2002.log" 2>&1 &
FRONTEND_2002_PID=$!
echo "   Web门户前端启动中 (PID: ${FRONTEND_2002_PID})"
sleep 5

echo ""
echo "=========================================="
echo "✅ 所有服务启动完成"
echo "=========================================="
echo ""
echo "服务访问地址:"
echo "  📱 移动端前端:    http://localhost:2000"
echo "  ⚙️  后台管理前端:  http://localhost:2001"
echo "  🌐 Web门户前端:    http://localhost:2002"
echo "  🖥️  主后端API:     http://localhost:8081"
echo "  🔧 管理后端API:    http://localhost:8082"
echo ""
echo "进程ID:"
echo "  主后端: ${BACKEND_PID}"
echo "  管理后端: ${ADMIN_BACKEND_PID}"
echo "  移动端前端: ${FRONTEND_2000_PID}"
echo "  管理前端: ${FRONTEND_2001_PID}"
echo "  Web前端: ${FRONTEND_2002_PID}"
echo ""
echo "日志文件:"
echo "  ${LOG_DIR}/backend-8081.log"
echo "  ${LOG_DIR}/backend-8082.log"
echo "  ${LOG_DIR}/frontend-2000.log"
echo "  ${LOG_DIR}/frontend-2001.log"
echo "  ${LOG_DIR}/frontend-2002.log"
echo ""
echo "查看日志: tail -f ${LOG_DIR}/*.log"
echo "停止服务: ./stop-all-servers.sh"
echo "=========================================="

