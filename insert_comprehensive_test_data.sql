-- 全覆盖测试数据插入脚本
-- 创建时间: 2025-12-30
-- 说明: 为所有实体创建完整的测试数据，覆盖所有表

BEGIN TRANSACTION;

-- ============================================
-- 1. 用户数据 (USER表)
-- ============================================
INSERT INTO "USER" (user_name, full_name, eng_name, signature, gender, email_address, mobile, nickname, openid, avatar, voted, created, commented, score, active, is_deleted, is_leader, create_time, update_time) VALUES
('test_user_001', '测试用户001', 'Test User 001', '热爱创新，追求卓越', 'male', 'test001@example.com', '13800001001', '测试员001', 'openid_test_001', 'https://via.placeholder.com/100?text=User001', 5, 3, 8, 150, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('test_user_002', '测试用户002', 'Test User 002', '技术改变世界', 'female', 'test002@example.com', '13800001002', '测试员002', 'openid_test_002', 'https://via.placeholder.com/100?text=User002', 8, 2, 12, 200, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('test_user_003', '测试用户003', 'Test User 003', '团队协作，共同成长', 'male', 'test003@example.com', '13800001003', '测试员003', 'openid_test_003', 'https://via.placeholder.com/100?text=User003', 12, 5, 15, 350, 1, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('test_user_004', '测试用户004', 'Test User 004', '持续学习，不断进步', 'female', 'test004@example.com', '13800001004', '测试员004', 'openid_test_004', 'https://via.placeholder.com/100?text=User004', 3, 1, 5, 80, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('test_user_005', '测试用户005', 'Test User 005', '数据驱动决策', 'male', 'test005@example.com', '13800001005', '测试员005', 'openid_test_005', 'https://via.placeholder.com/100?text=User005', 6, 2, 10, 180, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('test_user_006', '测试用户006', 'Test User 006', '用户体验至上', 'female', 'test006@example.com', '13800001006', '测试员006', 'openid_test_006', 'https://via.placeholder.com/100?text=User006', 10, 4, 18, 280, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('test_user_007', '测试用户007', 'Test User 007', '质量第一，客户满意', 'male', 'test007@example.com', '13800001007', '测试员007', 'openid_test_007', 'https://via.placeholder.com/100?text=User007', 15, 6, 25, 450, 1, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('test_user_008', '测试用户008', 'Test User 008', '创新思维，勇于尝试', 'female', 'test008@example.com', '13800001008', '测试员008', 'openid_test_008', 'https://via.placeholder.com/100?text=User008', 4, 2, 6, 120, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 2. 标签数据 (tag表) - 确保标签存在
-- ============================================
INSERT OR IGNORE INTO tag (id, name, create_time, update_time) VALUES
(1, '枢纽', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '园区', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '补电+', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '其他', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 3. 心声数据 (voice表)
-- ============================================
INSERT INTO voice (user_id, title, content, commented, voted, type, status, images, is_deleted, create_time, update_time) VALUES
((SELECT id FROM USER WHERE user_name = 'test_user_001' LIMIT 1), 
 '关于提升办公效率的创新想法', 
 '建议开发一个统一的办公协同平台，整合日程管理、任务分配、文档共享等功能，提升团队协作效率。可以通过移动端和PC端同步，让办公更加便捷高效。可以支持多人实时协作，提高工作效率。',
 3, 5, 'IDEA', 'NORMAL', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

((SELECT id FROM USER WHERE user_name = 'test_user_002' LIMIT 1), 
 '优化客户服务流程的建议', 
 '建议建立客户反馈快速响应机制，通过数据分析和客户画像，提前预判客户需求，提供个性化服务方案。同时建立客户满意度评价体系，持续改进服务质量。这样可以提升客户满意度，增强客户粘性。',
 2, 8, 'IDEA', 'NORMAL', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

((SELECT id FROM USER WHERE user_name = 'test_user_001' LIMIT 1), 
 '关于食堂菜品的建议', 
 '最近食堂的菜品品种比较少，希望能增加一些蔬菜和水果的选择。另外，建议增加一些健康低脂的菜品，满足不同员工的口味需求。还可以考虑增加一些地方特色菜，丰富菜品选择。',
 1, 3, 'GOSSIPING', 'NORMAL', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

((SELECT id FROM USER WHERE user_name = 'test_user_003' LIMIT 1), 
 '办公室环境改善建议', 
 '希望能在办公区域增加一些绿植，改善空气质量。另外，建议调整一下空调温度，有时候太冷了。还有就是希望能有更多的休息区域供大家放松。这样可以提升工作环境的舒适度。',
 2, 6, 'GOSSIPING', 'NORMAL', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

((SELECT id FROM USER WHERE user_name = 'test_user_004' LIMIT 1), 
 '智能停车系统创新方案', 
 '建议开发智能停车管理系统，通过AI识别和数据分析，优化停车位分配，减少停车等待时间。可以结合手机APP，实时显示空闲车位，引导车辆快速停车。这样可以大大提升停车效率，节省员工时间。',
 4, 12, 'IDEA', 'NORMAL', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

((SELECT id FROM USER WHERE user_name = 'test_user_005' LIMIT 1), 
 '员工培训体系优化方案', 
 '建议建立完善的员工培训体系，包括新员工入职培训、专业技能培训、管理能力培训等。可以结合在线学习平台，让员工随时随地学习。还可以邀请行业专家进行分享，提升培训质量。',
 5, 15, 'IDEA', 'NORMAL', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

((SELECT id FROM USER WHERE user_name = 'test_user_006' LIMIT 1), 
 '关于年会活动的想法', 
 '希望今年的年会能够更加有趣，可以增加一些互动环节，让大家都参与进来。可以设置一些有趣的游戏和抽奖活动，让大家在轻松愉快的氛围中交流。',
 2, 4, 'GOSSIPING', 'NORMAL', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

((SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1), 
 '数据分析平台建设建议', 
 '建议建设统一的数据分析平台，整合各部门的业务数据，通过数据可视化和分析，为决策提供支持。可以建立数据中台，实现数据的统一管理和共享。',
 6, 20, 'IDEA', 'TO_PROJECT', NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 4. 心声标签关联 (voice_tag表)
-- ============================================
INSERT INTO voice_tag (voice_id, tag_id, create_time, update_time)
SELECT v.id, t.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, tag t
WHERE v.title LIKE '%办公效率%' AND t.id = 1
LIMIT 1;

INSERT INTO voice_tag (voice_id, tag_id, create_time, update_time)
SELECT v.id, t.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, tag t
WHERE v.title LIKE '%客户服务%' AND t.id = 2
LIMIT 1;

INSERT INTO voice_tag (voice_id, tag_id, create_time, update_time)
SELECT v.id, t.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, tag t
WHERE v.title LIKE '%停车%' AND t.id = 3
LIMIT 1;

INSERT INTO voice_tag (voice_id, tag_id, create_time, update_time)
SELECT v.id, t.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, tag t
WHERE v.title LIKE '%培训%' AND t.id = 4
LIMIT 1;

INSERT INTO voice_tag (voice_id, tag_id, create_time, update_time)
SELECT v.id, t.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, tag t
WHERE v.title LIKE '%年会%' AND t.id = 4
LIMIT 1;

-- ============================================
-- 5. 评论数据 (COMMENT表)
-- ============================================
INSERT INTO COMMENT (voice_id, user_id, content, comment_id, voted, commented, user_id_commented, images, is_deleted, create_time, update_time)
SELECT v.id, u.id, '这个想法很有创意，值得深入探讨！我也有一些相关的经验可以分享。', 0, 2, 0, 0, NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, USER u
WHERE v.title LIKE '%办公效率%' AND u.user_name = 'test_user_002'
LIMIT 1;

INSERT INTO COMMENT (voice_id, user_id, content, comment_id, voted, commented, user_id_commented, images, is_deleted, create_time, update_time)
SELECT v.id, u.id, '同意这个建议，食堂确实需要改进。我也有类似的感受。', 0, 1, 1, 0, NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, USER u
WHERE v.title LIKE '%食堂%' AND u.user_name = 'test_user_003'
LIMIT 1;

INSERT INTO COMMENT (voice_id, user_id, content, comment_id, voted, commented, user_id_commented, images, is_deleted, create_time, update_time)
SELECT c.id, u.id, '谢谢支持！我们可以进一步讨论具体的实施方案。', c.id, 0, 0, c.user_id, NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM COMMENT c, USER u
WHERE c.user_id = (SELECT id FROM USER WHERE user_name = 'test_user_002' LIMIT 1)
  AND u.user_name = 'test_user_001'
LIMIT 1;

INSERT INTO COMMENT (voice_id, user_id, content, comment_id, voted, commented, user_id_commented, images, is_deleted, create_time, update_time)
SELECT v.id, u.id, '这个方案非常实用，期待能够落地实施！', 0, 3, 0, 0, NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, USER u
WHERE v.title LIKE '%停车%' AND u.user_name = 'test_user_005'
LIMIT 1;

INSERT INTO COMMENT (voice_id, user_id, content, comment_id, voted, commented, user_id_commented, images, is_deleted, create_time, update_time)
SELECT v.id, u.id, '很好的建议，培训体系确实需要系统化。', 0, 1, 0, 0, NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, USER u
WHERE v.title LIKE '%培训%' AND u.user_name = 'test_user_007'
LIMIT 1;

INSERT INTO COMMENT (voice_id, user_id, content, comment_id, voted, commented, user_id_commented, images, is_deleted, create_time, update_time)
SELECT v.id, u.id, '数据分析平台的建设很重要，可以大大提升决策效率。', 0, 4, 0, 0, NULL, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, USER u
WHERE v.title LIKE '%数据%' AND u.user_name = 'test_user_003'
LIMIT 1;

-- ============================================
-- 6. 点赞数据 (vote表)
-- ============================================
INSERT OR IGNORE INTO vote (user_id, voice_id, comment_id, create_time, update_time)
SELECT u.id, v.id, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_002' AND v.title LIKE '%办公效率%'
LIMIT 1;

INSERT OR IGNORE INTO vote (user_id, voice_id, comment_id, create_time, update_time)
SELECT u.id, v.id, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_003' AND v.title LIKE '%办公效率%'
LIMIT 1;

INSERT OR IGNORE INTO vote (user_id, voice_id, comment_id, create_time, update_time)
SELECT u.id, v.id, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_004' AND v.title LIKE '%客户服务%'
LIMIT 1;

INSERT OR IGNORE INTO vote (user_id, voice_id, comment_id, create_time, update_time)
SELECT u.id, v.id, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_005' AND v.title LIKE '%停车%'
LIMIT 1;

INSERT OR IGNORE INTO vote (user_id, voice_id, comment_id, create_time, update_time)
SELECT u.id, 0, c.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, COMMENT c
WHERE u.user_name = 'test_user_003' AND c.user_id = (SELECT id FROM USER WHERE user_name = 'test_user_002' LIMIT 1)
LIMIT 1;

-- ============================================
-- 7. @提醒数据 (voice_at表)
-- ============================================
INSERT INTO voice_at (voice_id, user_id, is_read, create_time, update_time)
SELECT v.id, u.id, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, USER u
WHERE v.title LIKE '%办公效率%' AND u.user_name = 'test_user_003'
LIMIT 1;

INSERT INTO voice_at (voice_id, user_id, is_read, create_time, update_time)
SELECT v.id, u.id, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM voice v, USER u
WHERE v.title LIKE '%客户服务%' AND u.user_name = 'test_user_004'
LIMIT 1;

-- ============================================
-- 8. 勋章数据 (medal表) - 确保勋章存在
-- ============================================
INSERT OR IGNORE INTO medal (code, name, description, grant_type, min_score, min_created, min_commented, min_voted, require_leader, enabled, sort_no, create_time, update_time) VALUES
('FIRST_POST', '初声一鸣', '发布第一条员工声音或创意', 'AUTO', NULL, 1, NULL, NULL, 0, 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IDEA_MASTER', '创意达人', '累计发布创意/声音 20 条以上', 'AUTO', NULL, 20, NULL, NULL, 0, 1, 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SOCIAL_STAR', '社交之星', '累计评论 50 条以上', 'AUTO', NULL, NULL, 50, NULL, 0, 1, 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TOP100', '百强贡献者', '积分进入全公司前 100 名', 'MANUAL', 1000, NULL, NULL, NULL, 0, 1, 40, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LEADER_MENTOR', '领航导师', '领导身份，且活跃贡献较高', 'AUTO', 500, NULL, NULL, NULL, 1, 1, 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('POPULAR_VOICE', '人气之声', '累计获得点赞 100 次以上', 'AUTO', NULL, NULL, NULL, 100, 0, 1, 25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 9. 用户勋章关联 (user_medal表)
-- ============================================
INSERT OR IGNORE INTO user_medal (user_id, medal_id, obtained_time, source_type, is_deleted, create_time, update_time)
SELECT u.id, m.id, CURRENT_TIMESTAMP, 'AUTO', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, medal m
WHERE u.user_name = 'test_user_001' AND m.code = 'FIRST_POST'
LIMIT 1;

INSERT OR IGNORE INTO user_medal (user_id, medal_id, obtained_time, source_type, is_deleted, create_time, update_time)
SELECT u.id, m.id, CURRENT_TIMESTAMP, 'AUTO', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, medal m
WHERE u.user_name = 'test_user_003' AND m.code = 'LEADER_MENTOR'
LIMIT 1;

INSERT OR IGNORE INTO user_medal (user_id, medal_id, obtained_time, source_type, is_deleted, create_time, update_time)
SELECT u.id, m.id, CURRENT_TIMESTAMP, 'AUTO', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, medal m
WHERE u.user_name = 'test_user_007' AND m.code = 'LEADER_MENTOR'
LIMIT 1;

-- ============================================
-- 10. 推荐数据 (voice_recommend表)
-- ============================================
INSERT OR IGNORE INTO voice_recommend (user_id, voice_id, create_time, update_time)
SELECT u.id, v.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_003' AND v.type = 'IDEA' AND v.title LIKE '%办公效率%'
LIMIT 1;

INSERT OR IGNORE INTO voice_recommend (user_id, voice_id, create_time, update_time)
SELECT u.id, v.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_007' AND v.type = 'IDEA' AND v.title LIKE '%数据%'
LIMIT 1;

-- ============================================
-- 11. 赞同数据 (voice_agree表)
-- ============================================
INSERT OR IGNORE INTO voice_agree (user_id, voice_id, agree_type, create_time, update_time)
SELECT u.id, v.id, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_002' AND v.type = 'GOSSIPING' AND v.title LIKE '%食堂%'
LIMIT 1;

INSERT OR IGNORE INTO voice_agree (user_id, voice_id, agree_type, create_time, update_time)
SELECT u.id, v.id, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_004' AND v.type = 'GOSSIPING' AND v.title LIKE '%办公室%'
LIMIT 1;

INSERT OR IGNORE INTO voice_agree (user_id, voice_id, agree_type, create_time, update_time)
SELECT u.id, v.id, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM USER u, voice v
WHERE u.user_name = 'test_user_005' AND v.type = 'GOSSIPING' AND v.title LIKE '%年会%'
LIMIT 1;

-- ============================================
-- 12. 任务板数据 (taskboard表)
-- ============================================
INSERT INTO taskboard (title, summary, description, background, pain_points, target_indicators, board_owner_id, board_owner_dept, board_owner_position, status, bid_deadline, project_start_time, project_end_time, reward_scheme, allow_cross_dept, allow_newcomers, max_bidders, tags, priority, difficulty, domain, created_by, is_deleted, create_time, update_time)
SELECT 
  '智能停车管理系统开发',
  '开发一套智能停车管理系统，解决停车难问题',
  '通过AI识别和数据分析，优化停车位分配，减少停车等待时间。可以结合手机APP，实时显示空闲车位，引导车辆快速停车。',
  '当前停车场管理混乱，停车效率低，员工停车困难',
  '停车等待时间长，车位利用不均衡，缺乏实时信息',
  '{"响应时间": "停车等待时间减少50%", "利用率": "车位利用率提升30%", "满意度": "员工满意度>4.5分"}',
  (SELECT id FROM USER WHERE user_name = 'test_user_003' LIMIT 1),
  '技术部',
  '技术总监',
  'BIDDING',
  datetime('now', '+30 days'),
  datetime('now', '+45 days'),
  datetime('now', '+135 days'),
  '{"奖金": "20万", "荣誉": "优秀项目奖", "晋升": "优先考虑"}',
  1,
  1,
  5,
  '["技术", "AI", "系统优化"]',
  2,
  'MEDIUM',
  '技术',
  (SELECT id FROM USER WHERE user_name = 'test_user_003' LIMIT 1),
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='taskboard')
LIMIT 1;

INSERT INTO taskboard (title, summary, description, background, pain_points, target_indicators, board_owner_id, board_owner_dept, board_owner_position, status, bid_deadline, project_start_time, project_end_time, reward_scheme, allow_cross_dept, allow_newcomers, max_bidders, tags, priority, difficulty, domain, created_by, is_deleted, create_time, update_time)
SELECT 
  '数据分析平台建设',
  '建设统一的数据分析平台，为决策提供数据支持',
  '整合各部门的业务数据，通过数据可视化和分析，为决策提供支持。可以建立数据中台，实现数据的统一管理和共享。',
  '当前数据分散在各个系统，缺乏统一的分析平台',
  '数据孤岛问题严重，数据分析效率低，决策缺乏数据支持',
  '{"数据整合": "整合80%以上业务数据", "分析效率": "数据分析效率提升60%", "决策支持": "为90%以上决策提供数据支持"}',
  (SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1),
  '数据部',
  '数据总监',
  'IN_PROGRESS',
  datetime('now', '+15 days'),
  datetime('now', '+20 days'),
  datetime('now', '+110 days'),
  '{"奖金": "30万", "荣誉": "突出贡献奖"}',
  1,
  0,
  3,
  '["数据", "平台", "BI"]',
  1,
  'HARD',
  '数据',
  (SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1),
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='taskboard')
LIMIT 1;

-- ============================================
-- 13. 投标数据 (bid表)
-- ============================================
INSERT INTO bid (taskboard_id, bidder_id, bidder_dept, bid_type, solution_summary, solution_detail, review_status, is_selected, is_deleted, create_time, update_time)
SELECT 
  (SELECT id FROM taskboard WHERE title LIKE '%停车%' LIMIT 1),
  (SELECT id FROM USER WHERE user_name = 'test_user_004' LIMIT 1),
  '技术部',
  'INDIVIDUAL',
  '我们有丰富的AI开发经验，可以快速完成此项目。',
  '采用深度学习算法进行车位识别，结合实时数据分析和路径优化算法，实现智能停车引导。预计3个月内完成开发，2个月内完成测试和上线。',
  'PENDING',
  0,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='bid')
LIMIT 1;

INSERT INTO bid (taskboard_id, bidder_id, bidder_dept, bid_type, solution_summary, solution_detail, review_status, is_selected, is_deleted, create_time, update_time)
SELECT 
  (SELECT id FROM taskboard WHERE title LIKE '%停车%' LIMIT 1),
  (SELECT id FROM USER WHERE user_name = 'test_user_005' LIMIT 1),
  '产品部',
  'INDIVIDUAL',
  '我们从用户体验角度出发，设计更人性化的停车系统。',
  '重点关注用户体验，设计简洁易用的手机APP界面，提供实时车位查询、导航、预约等功能。同时考虑无障碍设计，让所有用户都能方便使用。',
  'APPROVED',
  1,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='bid')
LIMIT 1;

-- ============================================
-- 14. 项目数据 (project表)
-- ============================================
INSERT INTO project (taskboard_id, bid_id, leader_id, title, description, target_indicators, start_time, end_time, current_stage, overall_progress, status, created_by, is_deleted, create_time, update_time)
SELECT 
  (SELECT id FROM taskboard WHERE title LIKE '%数据%' LIMIT 1),
  NULL,
  (SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1),
  '数据分析平台建设项目',
  '建设统一的数据分析平台，整合各部门业务数据，提供数据分析和可视化服务。',
  '{"数据整合率": "80%", "分析效率": "提升60%", "用户满意度": ">4.5分"}',
  datetime('now', '-10 days'),
  datetime('now', '+100 days'),
  '需求分析',
  15,
  'IN_PROGRESS',
  (SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1),
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='project')
LIMIT 1;

-- ============================================
-- 15. 项目成员数据 (project_member表)
-- ============================================
INSERT OR IGNORE INTO project_member (project_id, user_id, role, responsibility, join_time, status)
SELECT 
  (SELECT id FROM project WHERE title LIKE '%数据%' LIMIT 1),
  (SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1),
  'LEADER',
  '项目总负责，协调各方资源，推进项目进度',
  CURRENT_TIMESTAMP,
  'ACTIVE'
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='project_member')
LIMIT 1;

INSERT OR IGNORE INTO project_member (project_id, user_id, role, responsibility, join_time, status)
SELECT 
  (SELECT id FROM project WHERE title LIKE '%数据%' LIMIT 1),
  (SELECT id FROM USER WHERE user_name = 'test_user_002' LIMIT 1),
  '核心成员',
  '负责数据平台架构设计和技术实现',
  CURRENT_TIMESTAMP,
  'ACTIVE'
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='project_member')
LIMIT 1;

INSERT OR IGNORE INTO project_member (project_id, user_id, role, responsibility, join_time, status)
SELECT 
  (SELECT id FROM project WHERE title LIKE '%数据%' LIMIT 1),
  (SELECT id FROM USER WHERE user_name = 'test_user_005' LIMIT 1),
  '核心成员',
  '负责前端展示和数据可视化',
  CURRENT_TIMESTAMP,
  'ACTIVE'
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='project_member')
LIMIT 1;

-- ============================================
-- 16. 里程碑数据 (milestone表)
-- ============================================
INSERT INTO milestone (project_id, name, description, target_date, completion_status, created_by, create_time, update_time)
SELECT 
  (SELECT id FROM project WHERE title LIKE '%数据%' LIMIT 1),
  '需求分析完成',
  '完成各部门需求调研和分析，形成需求文档',
  datetime('now', '+20 days'),
  'IN_PROGRESS',
  (SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='milestone')
LIMIT 1;

INSERT INTO milestone (project_id, name, description, target_date, completion_status, created_by, create_time, update_time)
SELECT 
  (SELECT id FROM project WHERE title LIKE '%数据%' LIMIT 1),
  '系统架构设计完成',
  '完成系统架构设计，确定技术方案',
  datetime('now', '+40 days'),
  'PENDING',
  (SELECT id FROM USER WHERE user_name = 'test_user_007' LIMIT 1),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='milestone')
LIMIT 1;

-- ============================================
-- 17. 任务数据 (task表)
-- ============================================
INSERT INTO task (milestone_id, project_id, title, description, assignee_id, status, priority, create_time, update_time)
SELECT 
  (SELECT id FROM milestone WHERE name LIKE '%需求%' LIMIT 1),
  (SELECT id FROM project WHERE title LIKE '%数据%' LIMIT 1),
  '需求调研',
  '对各部门进行需求调研，收集业务需求和痛点',
  (SELECT id FROM USER WHERE user_name = 'test_user_002' LIMIT 1),
  'IN_PROGRESS',
  'HIGH',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='task')
LIMIT 1;

-- ============================================
-- 18. 进度日志数据 (progress_log表)
-- ============================================
INSERT INTO progress_log (project_id, milestone_id, author_id, content_summary, content_detail, current_progress, progress_status, create_time)
SELECT 
  (SELECT id FROM project WHERE title LIKE '%数据%' LIMIT 1),
  (SELECT id FROM milestone WHERE name LIKE '%需求%' LIMIT 1),
  (SELECT id FROM USER WHERE user_name = 'test_user_002' LIMIT 1),
  '完成技术部需求调研',
  '已完成技术部门的需求调研，收集了10个业务场景的需求。下一步将进行产品部门的需求调研。',
  30,
  'NORMAL',
  CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='progress_log')
LIMIT 1;

COMMIT;

-- ============================================
-- 数据统计输出
-- ============================================
SELECT '========================================' as '';
SELECT '数据插入完成！' as status;
SELECT '========================================' as '';

SELECT '用户总数: ' || COUNT(*) as user_count FROM USER WHERE is_deleted = 0;
SELECT '心声总数: ' || COUNT(*) as voice_count FROM voice WHERE is_deleted = 0;
SELECT '  - 创意(IDEA): ' || COUNT(*) as idea_count FROM voice WHERE type = 'IDEA' AND is_deleted = 0;
SELECT '  - 员工声音(GOSSIPING): ' || COUNT(*) as gossiping_count FROM voice WHERE type = 'GOSSIPING' AND is_deleted = 0;
SELECT '评论总数: ' || COUNT(*) as comment_count FROM COMMENT WHERE is_deleted = 0;
SELECT '点赞总数: ' || COUNT(*) as vote_count FROM vote;
SELECT '标签总数: ' || COUNT(*) as tag_count FROM tag;
SELECT '勋章总数: ' || COUNT(*) as medal_count FROM medal;
SELECT '用户勋章关联: ' || COUNT(*) as user_medal_count FROM user_medal WHERE is_deleted = 0;
SELECT '推荐总数: ' || COUNT(*) as recommend_count FROM voice_recommend;
SELECT '赞同总数: ' || COUNT(*) as agree_count FROM voice_agree WHERE agree_type = 1;
SELECT '@提醒总数: ' || COUNT(*) as at_count FROM voice_at;

SELECT '任务板总数: ' || COUNT(*) as taskboard_count FROM taskboard WHERE is_deleted = 0;
SELECT '投标总数: ' || COUNT(*) as bid_count FROM bid WHERE is_deleted = 0;
SELECT '项目总数: ' || COUNT(*) as project_count FROM project WHERE is_deleted = 0;
SELECT '项目成员总数: ' || COUNT(*) as member_count FROM project_member;
SELECT '里程碑总数: ' || COUNT(*) as milestone_count FROM milestone;
SELECT '任务总数: ' || COUNT(*) as task_count FROM task;

SELECT '========================================' as '';
