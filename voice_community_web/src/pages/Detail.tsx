import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Card,
  Typography,
  Space,
  Avatar,
  Button,
  List,
  Tag,
  Spin,
  Image,
  Divider,
  Input,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  LikeOutlined,
  CommentOutlined,
  UserOutlined,
  ClockCircleOutlined,
  BulbOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { getVoiceById, getAllCommentByVoiceId, addLike, cancelLike } from '../api';
import './Detail.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Comment {
  id: number;
  content: string;
  user: {
    userName?: string;
    fullName?: string;
    avatar?: string;
  };
  createTime: string;
  voted: number;
}

export default function Detail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [liked, setLiked] = useState(false);
  const [orderBy, setOrderBy] = useState('update_time');

  useEffect(() => {
    if (id) {
      loadDetail();
      loadComments();
    }
  }, [id, orderBy]);

  const loadDetail = async () => {
    try {
      setLoading(true);
      const response = await getVoiceById(id);
      setDetail(response);
      // 检查是否已点赞（这里简化处理，实际应该调用API检查）
      setLiked(false);
    } catch (error) {
      console.error('加载详情失败:', error);
      message.error('加载详情失败');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await getAllCommentByVoiceId({
        pageNum: 1,
        pageSize: 10,
        voiceId: id,
        orderBy: orderBy,
      });
      if (response?.dataList) {
        setComments(response.dataList);
      }
    } catch (error) {
      console.error('加载评论失败:', error);
    }
  };

  const handleLike = async () => {
    if (!detail) return;
    const userId = Number(localStorage.getItem('userId')) || 1;
    
    try {
      if (liked) {
        await cancelLike(detail.id, userId, 'voice');
        setLiked(false);
        setDetail((prev: any) => ({
          ...prev,
          voted: Math.max(0, (prev.voted || 0) - 1),
        }));
      } else {
        await addLike(detail.id, userId, 'voice');
        setLiked(true);
        setDetail((prev: any) => ({
          ...prev,
          voted: (prev.voted || 0) + 1,
        }));
      }
    } catch (error) {
      console.error('点赞操作失败:', error);
      message.error('操作失败');
    }
  };

  const handleComment = () => {
    message.info('评论功能开发中...');
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 30) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  if (loading) {
    return (
      <div className="detail-container">
        <div className="detail-loading">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="detail-container">
        <Card>
          <Text>内容不存在</Text>
        </Card>
      </div>
    );
  }

  const isIdea = detail.type === 'IDEA';
  const isGossiping = detail.type === 'GOSSIPING';

  return (
    <div className="detail-container">
      <div className="detail-content">
        {/* 返回按钮 */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="detail-back-btn"
        >
          返回
        </Button>

        {/* 主要内容卡片 */}
        <Card className="detail-main-card">
          {/* 头部信息 */}
          <div className="detail-header">
            <Space>
              <Avatar
                src={detail.user?.avatar}
                icon={<UserOutlined />}
                size={48}
              />
              <div>
                <div className="detail-author">
                  {detail.user?.fullName || detail.user?.userName || '匿名用户'}
                </div>
                <div className="detail-meta">
                  <Space split="|">
                    <Space size="small">
                      <ClockCircleOutlined />
                      <Text type="secondary">{formatTime(detail.createTime)}</Text>
                    </Space>
                    <Tag
                      color={isIdea ? 'blue' : 'purple'}
                      icon={isIdea ? <BulbOutlined /> : <MessageOutlined />}
                    >
                      {isIdea ? '创意' : '吐槽'}
                    </Tag>
                  </Space>
                </div>
              </div>
            </Space>
          </div>

          <Divider />

          {/* 标题 */}
          <Title level={2} className="detail-title">
            {detail.title || '无标题'}
          </Title>

          {/* 内容 */}
          <Paragraph className="detail-text">
            {detail.content}
          </Paragraph>

          {/* 图片 */}
          {detail.images && detail.images.length > 0 && (
            <div className="detail-images">
              <Image.PreviewGroup>
                {detail.images.map((img: string, index: number) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`图片${index + 1}`}
                    className="detail-image-item"
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          )}

          {/* 操作栏 */}
          <div className="detail-actions">
            <Space size="large">
              <Button
                type={liked ? 'primary' : 'default'}
                icon={<LikeOutlined />}
                onClick={handleLike}
                size="large"
              >
                {detail.voted || 0}
              </Button>
              <Button
                icon={<CommentOutlined />}
                onClick={handleComment}
                size="large"
              >
                {detail.commented || 0} 条评论
              </Button>
            </Space>
          </div>
        </Card>

        {/* 评论区域 */}
        <Card
          title={
            <Space>
              <CommentOutlined />
              <span>评论 ({detail.commented || 0})</span>
            </Space>
          }
          className="detail-comments-card"
          extra={
            <Space>
              <Button
                type={orderBy === 'voted' ? 'primary' : 'default'}
                size="small"
                onClick={() => setOrderBy('voted')}
              >
                最热
              </Button>
              <Button
                type={orderBy === 'update_time' ? 'primary' : 'default'}
                size="small"
                onClick={() => setOrderBy('update_time')}
              >
                最新
              </Button>
            </Space>
          }
        >
          {/* 评论输入框 */}
          <div className="detail-comment-input">
            <TextArea
              rows={4}
              placeholder="写下你的评论..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button
              type="primary"
              onClick={handleComment}
              style={{ marginTop: 12 }}
            >
              发布评论
            </Button>
          </div>

          <Divider />

          {/* 评论列表 */}
          <List
            dataSource={comments}
            locale={{ emptyText: '暂无评论，快来抢沙发吧~' }}
            renderItem={(comment) => (
              <List.Item className="detail-comment-item">
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={comment.user?.avatar}
                      icon={<UserOutlined />}
                    />
                  }
                  title={
                    <Space>
                      <span className="comment-author">
                        {comment.user?.fullName || comment.user?.userName || '匿名'}
                      </span>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {formatTime(comment.createTime)}
                      </Text>
                    </Space>
                  }
                  description={
                    <div>
                      <Paragraph style={{ marginBottom: 8 }}>
                        {comment.content}
                      </Paragraph>
                      <Space>
                        <Button type="text" size="small" icon={<LikeOutlined />}>
                          {comment.voted || 0}
                        </Button>
                      </Space>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}

