import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  LikeOutlined, 
  CommentOutlined,
  TagOutlined,
  TrophyOutlined,
  ProjectOutlined,
  MessageOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { getStatistics } from '../api/statisticsApi';
import '../styles/management.css';

export default function Statistics() {
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const response = await getStatistics();
      setStats(response.data || {});
    } catch (error) {
      console.error('加载统计数据失败', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="management-container">
      <Card className="management-header" styles={{ body: { padding: '24px' } }} variant="outlined">
        <div className="header-title">关键指标统计</div>
      </Card>
      <Spin spinning={loading}>
        <Card className="management-content" styles={{ body: { padding: '24px' } }} variant="outlined">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="总用户数"
                value={stats.totalUsers || 0}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="活跃用户数"
                value={stats.activeUsers || 0}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="总心声数"
                value={stats.totalVoices || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="创意数"
                value={stats.ideaCount || 0}
                prefix={<BulbOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="吐槽数"
                value={stats.gossipingCount || 0}
                prefix={<MessageOutlined />}
                valueStyle={{ color: '#eb2f96' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="评论数"
                value={stats.totalComments || 0}
                prefix={<CommentOutlined />}
                valueStyle={{ color: '#13c2c2' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="标签数"
                value={stats.totalTags || 0}
                prefix={<TagOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="勋章数"
                value={stats.totalMedals || 0}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#fadb14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="项目数"
                value={stats.totalProjects || 0}
                prefix={<ProjectOutlined />}
                valueStyle={{ color: '#2f54eb' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card variant="outlined">
              <Statistic
                title="总点赞数"
                value={stats.totalVotes || 0}
                prefix={<LikeOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>
        </Card>
      </Spin>
    </div>
  );
}

