#!/bin/bash

# 添加测试数据脚本

BASE_URL="http://localhost:8081"

echo "=========================================="
echo "开始添加测试数据"
echo "=========================================="

# 1. 添加新用户
echo "1. 添加新用户..."
curl -X POST "${BASE_URL}/user/add" \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "testuser001",
    "fullName": "测试用户001",
    "signature": "这是一个测试用户",
    "openId": "openid_test_001",
    "avatar": "https://via.placeholder.com/100",
    "voted": 0,
    "created": 0,
    "commented": 0,
    "score": 0,
    "isLeader": false
  }'

echo ""
echo ""

curl -X POST "${BASE_URL}/user/add" \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "testuser002",
    "fullName": "测试用户002",
    "signature": "这也是一个测试用户",
    "openId": "openid_test_002",
    "avatar": "https://via.placeholder.com/100",
    "voted": 0,
    "created": 0,
    "commented": 0,
    "score": 0,
    "isLeader": false
  }'

echo ""
echo ""

# 2. 获取用户ID（假设新用户的ID）
echo "2. 获取用户列表以查找新用户ID..."
USER_LIST=$(curl -s "${BASE_URL}/user/getAllUsers")
echo "用户列表已获取"

# 3. 添加创意类型的心声（使用用户ID 1）
echo ""
echo "3. 添加创意类型的心声..."
curl -X POST "${BASE_URL}/voice/add" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "关于提升办公效率的创新想法",
    "content": "建议开发一个统一的办公协同平台，整合日程管理、任务分配、文档共享等功能，提升团队协作效率。可以通过移动端和PC端同步，让办公更加便捷高效。",
    "type": "IDEA",
    "status": "NORMAL",
    "tags": [1, 2],
    "atUserIds": []
  }'

echo ""
echo ""

curl -X POST "${BASE_URL}/voice/add" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "title": "优化客户服务流程的建议",
    "content": "建议建立客户反馈快速响应机制，通过数据分析和客户画像，提前预判客户需求，提供个性化服务方案。同时建立客户满意度评价体系，持续改进服务质量。",
    "type": "IDEA",
    "status": "NORMAL",
    "tags": [3, 4],
    "atUserIds": []
  }'

echo ""
echo ""

# 4. 添加员工声音类型的心声
echo "4. 添加员工声音类型的心声..."
curl -X POST "${BASE_URL}/voice/add" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 3,
    "title": "关于食堂菜品的建议",
    "content": "最近食堂的菜品品种比较少，希望能增加一些蔬菜和水果的选择。另外，建议增加一些健康低脂的菜品，满足不同员工的口味需求。",
    "type": "GOSSIPING",
    "status": "NORMAL",
    "tags": [4],
    "atUserIds": []
  }'

echo ""
echo ""

curl -X POST "${BASE_URL}/voice/add" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 4,
    "title": "办公室环境改善建议",
    "content": "希望能在办公区域增加一些绿植，改善空气质量。另外，建议调整一下空调温度，有时候太冷了。还有就是希望能有更多的休息区域供大家放松。",
    "type": "GOSSIPING",
    "status": "NORMAL",
    "tags": [4],
    "atUserIds": []
  }'

echo ""
echo ""

# 5. 获取心声ID并添加评论
echo "5. 获取最新心声列表..."
VOICE_LIST=$(curl -s "${BASE_URL}/voice/getVoicesByParam?pageNum=1&pageSize=5")

# 提取第一个心声的ID（假设是新添加的）
# 这里我们使用固定ID来演示，实际应该从响应中提取

echo "6. 添加评论（需要手动指定voiceId）..."
echo "注意：评论需要知道具体的voiceId，请根据实际情况修改"

echo ""
echo "=========================================="
echo "测试数据添加完成！"
echo "=========================================="
echo ""
echo "可以访问以下地址查看数据："
echo "- 用户列表: ${BASE_URL}/user/getAllUsers"
echo "- 心声列表: ${BASE_URL}/voice/getVoicesByParam?pageNum=1&pageSize=10"
echo "- 前端页面: http://localhost:5173"

