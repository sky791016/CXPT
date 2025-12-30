#!/bin/bash

echo "=========================================="
echo "🔄 数据刷新和展示"
echo "=========================================="
echo ""

# 1. 检查数据库
echo "1️⃣ 检查数据库连接..."
DB_PATH="voice_community_backend/data/voice_community.db"
if [ ! -f "$DB_PATH" ]; then
    echo "❌ 数据库文件不存在: $DB_PATH"
    exit 1
fi
echo "✅ 数据库文件存在"
echo ""

# 2. 显示数据统计
echo "2️⃣ 数据统计:"
sqlite3 "$DB_PATH" <<'SQL'
.mode column
.headers on
.width 25 12

SELECT '实体类型' as '数据统计', '数量' as '';

SELECT '用户' as type, COUNT(*) as count FROM USER WHERE is_deleted = 0
UNION ALL
SELECT '心声', COUNT(*) FROM voice WHERE is_deleted = 0
UNION ALL
SELECT '评论', COUNT(*) FROM COMMENT WHERE is_deleted = 0
UNION ALL
SELECT '点赞', COUNT(*) FROM vote
UNION ALL
SELECT '标签', COUNT(*) FROM tag
UNION ALL
SELECT '勋章', COUNT(*) FROM medal;
SQL

echo ""

# 3. 显示最新用户
echo "3️⃣ 最新用户（前10个）:"
sqlite3 "$DB_PATH" <<'SQL'
.mode table
SELECT id, user_name, full_name, score, created, voted, commented 
FROM USER 
WHERE is_deleted = 0 
ORDER BY id DESC 
LIMIT 10;
SQL

echo ""

# 4. 显示最新心声
echo "4️⃣ 最新心声（前10个）:"
sqlite3 "$DB_PATH" <<'SQL'
.mode table
SELECT id, substr(title, 1, 30) as title, type, status, commented, voted
FROM voice 
WHERE is_deleted = 0 
ORDER BY id DESC 
LIMIT 10;
SQL

echo ""

# 5. 检查后端服务
echo "5️⃣ 检查后端服务状态..."
if curl -s http://localhost:8081/actuator/health > /dev/null 2>&1 || curl -s http://localhost:8081/user/getAllUsers > /dev/null 2>&1; then
    echo "✅ 主后端服务运行中 (8081)"
    USER_COUNT=$(curl -s 'http://localhost:8081/user/getAllUsers' 2>/dev/null | python3 -c "import sys, json; d=json.load(sys.stdin); print(len(d.get('data', [])))" 2>/dev/null || echo "未知")
    echo "   API返回用户数: $USER_COUNT"
else
    echo "❌ 主后端服务未运行 (8081)"
    echo "   请运行: cd voice_community_backend && mvn spring-boot:run"
fi

if curl -s http://localhost:8082/actuator/health > /dev/null 2>&1 || curl -s http://localhost:8082/admin/statistics/overview > /dev/null 2>&1; then
    echo "✅ 管理后端服务运行中 (8082)"
else
    echo "⚠️  管理后端服务未运行 (8082)"
fi

echo ""
echo "=========================================="
echo "✅ 数据刷新完成"
echo "=========================================="
