import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Input as AntInput, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { getComments, createComment, updateComment, deleteComment, type Comment } from '../api/commentApi';
import '../styles/management.css';

const { Search } = AntInput;

export default function CommentManagement() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadComments();
  }, [pagination.current, pagination.pageSize]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const response = await getComments(pagination.current, pagination.pageSize);
      // 检查响应格式
      const data = response?.data || response;
      const list = data?.list || data?.dataList || [];
      const total = data?.total || data?.totalCount || 0;
      
      setComments(list);
      setPagination(prev => ({ ...prev, total }));
    } catch (error: any) {
      console.error('加载评论列表失败:', error);
      message.error(error?.response?.data?.message || '加载评论列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingComment(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
    form.setFieldsValue(comment);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteComment(id);
      message.success('删除成功');
      loadComments();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingComment) {
        await updateComment(editingComment.id!, values);
        message.success('更新成功');
      } else {
        await createComment(values);
        message.success('创建成功');
      }
      setModalVisible(false);
      loadComments();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    loadComments();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      fixed: 'left' as const,
    },
    {
      title: '心声ID',
      dataIndex: 'voiceId',
      key: 'voiceId',
      width: 100,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 400,
      render: (text: string) => text ? (text.length > 80 ? text.substring(0, 80) + '...' : text) : '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (time: string) => time ? new Date(time).toLocaleString('zh-CN') : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: (_: any, record: Comment) => (
        <Space size="small">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            style={{ padding: 0 }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条评论吗？"
            onConfirm={() => handleDelete(record.id!)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
              style={{ padding: 0 }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="management-container">
      <Card className="management-header" styles={{ body: { padding: '24px' } }}>
        <div className="header-title">评论管理</div>
        <div className="header-actions">
          <Search
            placeholder="搜索评论内容..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            className="search-bar"
            onSearch={handleSearch}
            onChange={(e) => !e.target.value && handleSearch('')}
          />
          <div className="action-buttons">
            <Button 
              icon={<ReloadOutlined />} 
              onClick={loadComments}
              style={{ marginRight: 8 }}
            >
              刷新
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleCreate}
              size="large"
            >
              新建评论
            </Button>
          </div>
        </div>
      </Card>

      <Card className="management-content" styles={{ body: { padding: '24px' } }}>
        <Table
          columns={columns}
          dataSource={comments}
          loading={loading}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: (page, pageSize) => setPagination(prev => ({ ...prev, current: page, pageSize })),
          }}
        />
      </Card>

      <Modal
        title={editingComment ? '编辑评论' : '新建评论'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
        className="management-modal"
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="voiceId" label="心声ID" rules={[{ required: true, message: '请输入心声ID' }]}>
            <Input type="number" placeholder="请输入心声ID" size="large" />
          </Form.Item>
          <Form.Item name="userId" label="用户ID" rules={[{ required: true, message: '请输入用户ID' }]}>
            <Input type="number" placeholder="请输入用户ID" size="large" />
          </Form.Item>
          <Form.Item name="content" label="评论内容" rules={[{ required: true, message: '请输入评论内容' }]}>
            <Input.TextArea rows={6} placeholder="请输入评论内容" />
          </Form.Item>
          <Form.Item name="commentId" label="父评论ID（可选）">
            <Input type="number" placeholder="请输入父评论ID" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
