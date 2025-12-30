#!/bin/bash

# 展示测试数据脚本

DB_PATH="voice_community_backend/data/voice_community.db"

echo "=========================================="
echo "📊 数据库测试数据统计"
echo "=========================================="
echo ""

sqlite3 "$DB_PATH" <<EOF
.mode column
.headers on

SELECT '用户数据' as '==== 数据统计 ====';

SELECT '用户总数' as type, COUNT(*) as count FROM USER WHERE is_deleted = 0
UNION ALL
SELECT '心声总数', COUNT(*) FROM voice WHERE is_deleted = 0
UNION ALL
SELECT '  - 创意(IDEA)', COUNT(*) FROM voice WHERE type = 'IDEA' AND is_deleted = 0
UNION ALL
SELECT '  - 员工声音', COUNT(*) FROM voice WHERE type = 'GOSSIPING' AND is_deleted = 0
UNION ALL
SELECT '评论总数', COUNT(*) FROM COMMENT WHERE is_deleted = 0
UNION ALL
SELECT '点赞总数', COUNT(*) FROM vote
UNION ALL
SELECT '标签总数', COUNT(*) FROM tag
UNION ALL
SELECT '勋章总数', COUNT(*) FROM medal
UNION ALL
SELECT '用户勋章关联', COUNT(*) FROM user_medal WHERE is_deleted = 0
UNION ALL
SELECT '推荐总数', COUNT(*) FROM voice_recommend
UNION ALL
SELECT '赞同总数', COUNT(*) FROM voice_agree WHERE agree_type = 1
UNION ALL
SELECT '@提醒总数', COUNT(*) FROM voice_at;

SELECT '';

SELECT '任务板数据' as '==== 任务板模块 ====';

SELECT '任务板总数' as type, COUNT(*) as count FROM taskboard WHERE is_deleted = 0
UNION ALL
SELECT '投标总数', COUNT(*) FROM bid WHERE is_deleted = 0
UNION ALL
SELECT '项目总数', COUNT(*) FROM project WHERE is_deleted = 0
UNION ALL
SELECT '项目成员总数', COUNT(*) FROM project_member
UNION ALL
SELECT '里程碑总数', COUNT(*) FROM milestone
UNION ALL
SELECT '任务总数', COUNT(*) FROM task
UNION ALL
SELECT '进度日志总数', COUNT(*) FROM progress_log;
EOF

echo ""
echo "=========================================="
echo "📋 最新用户列表 (前10个)"
echo "=========================================="
sqlite3 "$DB_PATH" <<EOF
.mode column
.headers on
SELECT id, user_name, full_name, signature, score, created, voted, commented, is_leader 
FROM USER 
WHERE is_deleted = 0 
ORDER BY id DESC 
LIMIT 10;
EOF

echo ""
echo "=========================================="
echo "📝 最新心声列表 (前10个)"
echo "=========================================="
sqlite3 "$DB_PATH" <<EOF
.mode column
.headers on
SELECT v.id, v.title, v.type, v.status, u.full_name as author, v.commented, v.voted
FROM voice v
LEFT JOIN USER u ON v.user_id = u.id
WHERE v.is_deleted = 0
ORDER BY v.id DESC
LIMIT 10;
EOF

echo ""
echo "=========================================="
echo "💬 最新评论列表 (前10个)"
echo "=========================================="
sqlite3 "$DB_PATH" <<EOF
.mode column
.headers on
SELECT c.id, substr(c.content, 1, 30) as content, u.full_name as author, v.title as voice_title, c.voted
FROM COMMENT c
LEFT JOIN USER u ON c.user_id = u.id
LEFT JOIN voice v ON c.voice_id = v.id
WHERE c.is_deleted = 0
ORDER BY c.id DESC
LIMIT 10;
EOF

echo ""
echo "=========================================="
echo "🏆 勋章列表"
echo "=========================================="
sqlite3 "$DB_PATH" <<EOF
.mode column
.headers on
SELECT id, code, name, description, grant_type, enabled
FROM medal
ORDER BY sort_no, id;
EOF

echo ""
echo "=========================================="
echo "🎯 任务板列表"
echo "=========================================="
sqlite3 "$DB_PATH" <<EOF
.mode column
.headers on
SELECT id, title, status, priority, difficulty
FROM taskboard
WHERE is_deleted = 0
ORDER BY id DESC
LIMIT 5;
EOF

echo ""
echo "=========================================="
echo "✅ 数据展示完成"
echo "=========================================="

