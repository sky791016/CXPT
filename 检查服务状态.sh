#!/bin/bash

# 检查所有服务状态的脚本

echo "=========================================="
echo "📊 服务运行状态检查"
echo "=========================================="
echo ""

# 检查后端服务
echo "后端服务:"
if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "  ✅ 主后端服务 (8081): 运行中"
    echo "     测试API:"
    USER_COUNT=$(curl -s http://localhost:8081/user/getAllUsers 2>/dev/null | python3 -c "import sys, json; d=json.load(sys.stdin); print(len(d))" 2>/dev/null || echo "N/A")
    echo "     用户API返回: $USER_COUNT 个用户"
    
    VOICE_RESPONSE=$(curl -s 'http://localhost:8081/voice/getVoicesByParam?pageNum=1&pageSize=3' 2>/dev/null)
    if echo "$VOICE_RESPONSE" | grep -q "dataList"; then
        VOICE_COUNT=$(echo "$VOICE_RESPONSE" | python3 -c "import sys, json; d=json.load(sys.stdin); print(len(d.get('dataList', [])))" 2>/dev/null || echo "N/A")
        echo "     心声API返回: $VOICE_COUNT 条心声"
    else
        echo "     心声API: 响应异常"
    fi
else
    echo "  ❌ 主后端服务 (8081): 未运行"
    echo "     ⚠️  这是数据为空的主要原因！"
    echo "     请在IDE中运行 VoiceCommunityBackendApplication"
fi

if lsof -Pi :8082 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "  ✅ 管理后端服务 (8082): 运行中"
else
    echo "  ⚠️  管理后端服务 (8082): 未运行"
fi

echo ""

# 检查前端服务
echo "前端服务:"
for port in 2000 2001 2002; do
    if lsof -Pi :${port} -sTCP:LISTEN -t >/dev/null 2>&1; then
        case $port in
            2000) echo "  ✅ 移动端前端 (2000): http://localhost:2000" ;;
            2001) echo "  ✅ 后台管理前端 (2001): http://localhost:2001" ;;
            2002) echo "  ✅ Web门户前端 (2002): http://localhost:2002" ;;
        esac
    else
        case $port in
            2000) echo "  ❌ 移动端前端 (2000): 未运行" ;;
            2001) echo "  ❌ 后台管理前端 (2001): 未运行" ;;
            2002) echo "  ❌ Web门户前端 (2002): 未运行" ;;
        esac
    fi
done

echo ""

# 检查数据库
echo "数据库状态:"
DB_FILE="voice_community_backend/data/voice_community.db"
if [ -f "$DB_FILE" ]; then
    echo "  ✅ 数据库文件存在"
    USER_COUNT=$(sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM USER WHERE is_deleted = 0;" 2>/dev/null)
    VOICE_COUNT=$(sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM voice WHERE is_deleted = 0;" 2>/dev/null)
    COMMENT_COUNT=$(sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM COMMENT WHERE is_deleted = 0;" 2>/dev/null)
    echo "     用户数: $USER_COUNT"
    echo "     心声数: $VOICE_COUNT"
    echo "     评论数: $COMMENT_COUNT"
else
    echo "  ❌ 数据库文件不存在"
fi

echo ""
echo "=========================================="
echo "💡 提示"
echo "=========================================="
if ! lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  后端服务未运行，这是数据为空的主要原因！"
    echo ""
    echo "解决步骤:"
    echo "  1. 在IDE中打开 voice_community_backend 项目"
    echo "  2. 运行 VoiceCommunityBackendApplication"
    echo "  3. 等待服务启动（10-30秒）"
    echo "  4. 刷新前端页面"
else
    echo "✅ 所有服务运行正常"
    echo "   如果前端仍无数据，请检查浏览器控制台的错误信息"
fi
echo "=========================================="

