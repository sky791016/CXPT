import { useState, useEffect } from 'react';
import { Input, Card, Row, Col, Typography, Space, List, Avatar, Tag, Spin, Button } from 'antd';
import { 
  BulbOutlined, 
  MessageOutlined, 
  TrophyOutlined, 
  FlagOutlined,
  UserOutlined,
  SearchOutlined,
  FireOutlined,
  StarOutlined,
  LikeOutlined,
  CommentOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getVoicesByParam } from '../api';
import './Home.css';

const { Title, Text } = Typography;
const { Search } = Input;

interface PortalCard {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  gradient: string;
}

const portalCards: PortalCard[] = [
  {
    key: 'plaza',
    title: '创新广场',
    description: '分享创意想法，激发创新灵感',
    icon: <BulbOutlined />,
    path: '/plaza',
    color: '#5b8def',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    key: 'gossiping',
    title: '吐槽大街',
    description: '畅所欲言，倾听心声',
    icon: <MessageOutlined />,
    path: '/gossiping',
    color: '#764ba2',
    gradient: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
  },
  {
    key: 'medal',
    title: '勋章中心',
    description: '荣誉展示，成就徽章',
    icon: <TrophyOutlined />,
    path: '/medal',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    key: 'taskboard',
    title: '揭榜挂帅',
    description: '任务发布，项目协作',
    icon: <FlagOutlined />,
    path: '/taskboard',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    key: 'hot',
    title: '今日热议',
    description: '热门话题，精彩讨论',
    icon: <FireOutlined />,
    path: '/hot',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
  {
    key: 'ranking',
    title: '排行榜',
    description: '创意排行，点赞榜单',
    icon: <StarOutlined />,
    path: '/ranking',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
];

interface TopItem {
  id: string;
  title: string;
  content: string;
  user: {
    userName?: string;
    fullName?: string;
    avatar?: string;
  };
  voted: number;
  commented: number;
  createTime: string;
  type: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [topIdeas, setTopIdeas] = useState<TopItem[]>([]);
  const [topGossiping, setTopGossiping] = useState<TopItem[]>([]);
  const [topVoted, setTopVoted] = useState<TopItem[]>([]);
  const [topCommented, setTopCommented] = useState<TopItem[]>([]);

  useEffect(() => {
    loadTopData();
  }, []);

  const loadTopData = async () => {
    setLoading(true);
    try {
      // 获取热门创意（按点赞数）
      const ideasResponse = await getVoicesByParam({
        pageNum: 0,
        pageSize: 10,
        type: 'IDEA',
        sortBy: 'voted',
        sortType: 'desc',
      });
      if (ideasResponse?.dataList) {
        setTopIdeas(ideasResponse.dataList.slice(0, 10));
      }

      // 获取热门吐槽
      const gossipingResponse = await getVoicesByParam({
        pageNum: 0,
        pageSize: 10,
        type: 'GOSSIPING',
        sortBy: 'voted',
        sortType: 'desc',
      });
      if (gossipingResponse?.dataList) {
        setTopGossiping(gossipingResponse.dataList.slice(0, 10));
      }

      // 获取最热（按点赞数）
      const votedResponse = await getVoicesByParam({
        pageNum: 0,
        pageSize: 10,
        type: 'IDEA',
        sortBy: 'voted',
        sortType: 'desc',
      });
      if (votedResponse?.dataList) {
        setTopVoted(votedResponse.dataList.slice(0, 10));
      }

      // 获取最热（按评论数）
      const commentedResponse = await getVoicesByParam({
        pageNum: 0,
        pageSize: 10,
        type: 'IDEA',
        sortBy: 'commented',
        sortType: 'desc',
      });
      if (commentedResponse?.dataList) {
        setTopCommented(commentedResponse.dataList.slice(0, 10));
      }
    } catch (error) {
      console.error('加载TOP10数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    if (value.trim()) {
      // 跳转到搜索结果页
      navigate(`/search?keyword=${encodeURIComponent(value)}`);
    }
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleItemClick = (item: TopItem) => {
    if (item.type === 'IDEA') {
      navigate(`/plaza/detail?id=${item.id}`);
    } else if (item.type === 'GOSSIPING') {
      navigate(`/gossiping/detail?id=${item.id}`);
    }
  };

  return (
    <div className="portal-container">
      {/* 背景装饰 */}
      <div className="portal-background">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
      </div>

      {/* 主要内容 */}
      <div className="portal-content">
        {/* 右上角管理后台链接 */}
        <div className="portal-admin-link">
          <Button
            type="primary"
            icon={<SettingOutlined />}
            onClick={() => window.open('http://localhost:2001', '_blank')}
            className="admin-btn"
          >
            管理后台
          </Button>
        </div>

        {/* Logo和标题区域 */}
        <div className="portal-header">
          <Title level={1} className="portal-title">
            心声社区
          </Title>
          <Text className="portal-subtitle">
            汇聚创新思想，激发无限可能
          </Text>
        </div>

        {/* 搜索框区域 */}
        <div className="portal-search-section">
          <div className="portal-search-wrapper">
            <Search
              placeholder="搜索创意、话题、用户..."
              size="large"
              enterButton={<SearchOutlined />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              className="portal-search"
            />
          </div>
        </div>

        {/* TOP10 数据展示区域 */}
        <div className="portal-top10-section">
          <Row gutter={[24, 24]}>
            {/* 热门创意 TOP10 */}
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                title={
                  <Space>
                    <BulbOutlined style={{ color: '#5b8def' }} />
                    <span>热门创意 TOP10</span>
                  </Space>
                }
                className="portal-top10-card"
                hoverable
              >
                <Spin spinning={loading}>
                  <List
                    dataSource={topIdeas}
                    renderItem={(item, index) => (
                      <List.Item
                        className="portal-top10-item"
                        onClick={() => handleItemClick(item)}
                      >
                        <List.Item.Meta
                          avatar={
                            <div className="portal-rank-number">{index + 1}</div>
                          }
                          title={
                            <div className="portal-item-title">
                              {item.title || (item.content ? item.content.substring(0, 30) + '...' : '无标题')}
                            </div>
                          }
                          description={
                            <Space size="small" split="|">
                              <span className="portal-item-user">
                                {item.user?.fullName || item.user?.userName || '匿名'}
                              </span>
                              <Space size="small">
                                <LikeOutlined />
                                <span>{item.voted || 0}</span>
                              </Space>
                              <Space size="small">
                                <CommentOutlined />
                                <span>{item.commented || 0}</span>
                              </Space>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Spin>
              </Card>
            </Col>

            {/* 热门吐槽 TOP10 */}
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                title={
                  <Space>
                    <MessageOutlined style={{ color: '#764ba2' }} />
                    <span>热门吐槽 TOP10</span>
                  </Space>
                }
                className="portal-top10-card"
                hoverable
              >
                <Spin spinning={loading}>
                  <List
                    dataSource={topGossiping}
                    renderItem={(item, index) => (
                      <List.Item
                        className="portal-top10-item"
                        onClick={() => handleItemClick(item)}
                      >
                        <List.Item.Meta
                          avatar={
                            <div className="portal-rank-number">{index + 1}</div>
                          }
                          title={
                            <div className="portal-item-title">
                              {item.title || (item.content ? item.content.substring(0, 30) + '...' : '无标题')}
                            </div>
                          }
                          description={
                            <Space size="small" split="|">
                              <span className="portal-item-user">
                                {item.user?.fullName || item.user?.userName || '匿名'}
                              </span>
                              <Space size="small">
                                <LikeOutlined />
                                <span>{item.voted || 0}</span>
                              </Space>
                              <Space size="small">
                                <CommentOutlined />
                                <span>{item.commented || 0}</span>
                              </Space>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Spin>
              </Card>
            </Col>

            {/* 点赞榜 TOP10 */}
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                title={
                  <Space>
                    <LikeOutlined style={{ color: '#ef4444' }} />
                    <span>点赞榜 TOP10</span>
                  </Space>
                }
                className="portal-top10-card"
                hoverable
              >
                <Spin spinning={loading}>
                  <List
                    dataSource={topVoted}
                    renderItem={(item, index) => (
                      <List.Item
                        className="portal-top10-item"
                        onClick={() => handleItemClick(item)}
                      >
                        <List.Item.Meta
                          avatar={
                            <div className="portal-rank-number">{index + 1}</div>
                          }
                          title={
                            <div className="portal-item-title">
                              {item.title || (item.content ? item.content.substring(0, 30) + '...' : '无标题')}
                            </div>
                          }
                          description={
                            <Space size="small" split="|">
                              <span className="portal-item-user">
                                {item.user?.fullName || item.user?.userName || '匿名'}
                              </span>
                              <Space size="small">
                                <LikeOutlined />
                                <span>{item.voted || 0}</span>
                              </Space>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Spin>
              </Card>
            </Col>

            {/* 评论榜 TOP10 */}
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                title={
                  <Space>
                    <CommentOutlined style={{ color: '#10b981' }} />
                    <span>评论榜 TOP10</span>
                  </Space>
                }
                className="portal-top10-card"
                hoverable
              >
                <Spin spinning={loading}>
                  <List
                    dataSource={topCommented}
                    renderItem={(item, index) => (
                      <List.Item
                        className="portal-top10-item"
                        onClick={() => handleItemClick(item)}
                      >
                        <List.Item.Meta
                          avatar={
                            <div className="portal-rank-number">{index + 1}</div>
                          }
                          title={
                            <div className="portal-item-title">
                              {item.title || (item.content ? item.content.substring(0, 30) + '...' : '无标题')}
                            </div>
                          }
                          description={
                            <Space size="small" split="|">
                              <span className="portal-item-user">
                                {item.user?.fullName || item.user?.userName || '匿名'}
                              </span>
                              <Space size="small">
                                <CommentOutlined />
                                <span>{item.commented || 0}</span>
                              </Space>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Spin>
              </Card>
            </Col>
          </Row>
        </div>

        {/* 栏目卡片区域 */}
        <div className="portal-cards-section">
          <Row gutter={[24, 24]} justify="center">
            {portalCards.map((card) => (
              <Col 
                xs={24} 
                sm={12} 
                md={8} 
                lg={8} 
                xl={6} 
                key={card.key}
              >
                <Card
                  hoverable
                  className="portal-card"
                  onClick={() => handleCardClick(card.path)}
                  style={{
                    background: card.gradient,
                    border: 'none',
                    borderRadius: '16px',
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  bodyStyle={{
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: '200px',
                    justifyContent: 'center',
                  }}
                >
                  <div 
                    className="portal-card-icon"
                    style={{
                      fontSize: '48px',
                      color: 'white',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {card.icon}
                  </div>
                  <Title 
                    level={4} 
                    style={{ 
                      color: 'white', 
                      marginBottom: '8px',
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </Title>
                  <Text 
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px',
                    }}
                  >
                    {card.description}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* 底部信息 */}
        <div className="portal-footer">
          <Space direction="vertical" size="small" align="center">
            <Text type="secondary" style={{ fontSize: '14px' }}>
              心声社区 · 让每一个想法都有价值
            </Text>
            <Space>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                创新广场
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                ·
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                吐槽大街
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                ·
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                勋章中心
              </Text>
            </Space>
          </Space>
        </div>
      </div>
    </div>
  );
}
