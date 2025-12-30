import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, FileTextOutlined, LikeOutlined } from '@ant-design/icons';
import { getStatistics } from '../api/statisticsApi';

export default function Statistics() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const response = await getStatistics();
      setStats(response.data);
    } catch (error) {
      console.error('加载统计数据失败', error);
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={stats.totalUsers || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户数"
              value={stats.activeUsers || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总心声数"
              value={stats.totalVoices || 0}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="创意数"
              value={stats.ideaCount || 0}
              prefix={<LikeOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

