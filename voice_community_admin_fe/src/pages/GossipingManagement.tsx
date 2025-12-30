import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Input as AntInput, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { getVoices, createVoice, updateVoice, deleteVoice } from '../api/voiceApi';
import type { Voice } from '../types/voice';
import '../styles/management.css';

const { Search } = AntInput;

export default function GossipingManagement() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVoice, setEditingVoice] = useState<Voice | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadVoices();
  }, [pagination.current, pagination.pageSize]);

  const loadVoices = async () => {
    setLoading(true);
    try {
      const response = await getVoices(pagination.current, pagination.pageSize);
      // 检查响应格式
      const data = response?.data || response;
      const list = data?.list || data?.dataList || [];
      const total = data?.total || data?.totalCount || 0;
      
      // 筛选GOSSIPING类型
      const gossipingVoices = list.filter((v: Voice) => v.type === 'GOSSIPING');
      setVoices(gossipingVoices);
      setPagination(prev => ({ ...prev, total }));
    } catch (error: any) {
      console.error('加载吐槽列表失败:', error);
      message.error(error?.response?.data?.message || '加载吐槽列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingVoice(null);
    form.resetFields();
    form.setFieldsValue({ type: 'GOSSIPING' });
    setModalVisible(true);
  };

  const handleEdit = (voice: Voice) => {
    setEditingVoice(voice);
    form.setFieldsValue(voice);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVoice(id);
      message.success('删除成功');
      loadVoices();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.type = 'GOSSIPING';
      if (editingVoice) {
        await updateVoice(editingVoice.id!, values);
        message.success('更新成功');
      } else {
        await createVoice(values);
        message.success('创建成功');
      }
      setModalVisible(false);
      loadVoices();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    // 这里可以添加搜索逻辑
    loadVoices();
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 200,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 300,
      render: (text: string) => text ? (text.length > 50 ? text.substring(0, 50) + '...' : text) : '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          'NORMAL': { text: '正常', color: 'green' },
          'TO_PROJECT': { text: '转为项目', color: 'blue' },
        };
        const statusInfo = statusMap[status] || { text: status, color: 'default' };
        return <span style={{ color: statusInfo.color, fontWeight: 500 }}>{statusInfo.text}</span>;
      },
    },
    {
      title: '点赞数',
      dataIndex: 'voted',
      key: 'voted',
      width: 100,
      sorter: (a: Voice, b: Voice) => (a.voted || 0) - (b.voted || 0),
      render: (voted: number) => <span style={{ color: '#1890ff', fontWeight: 500 }}>{voted || 0}</span>,
    },
    {
      title: '评论数',
      dataIndex: 'commented',
      key: 'commented',
      width: 100,
      sorter: (a: Voice, b: Voice) => (a.commented || 0) - (b.commented || 0),
      render: (commented: number) => <span style={{ color: '#52c41a', fontWeight: 500 }}>{commented || 0}</span>,
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
      render: (_: any, record: Voice) => (
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
            title="确定要删除这条吐槽吗？"
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
        <div className="header-title">吐槽管理</div>
        <div className="header-actions">
          <Search
            placeholder="搜索标题或内容..."
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
              onClick={loadVoices}
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
              新建吐槽
            </Button>
          </div>
        </div>
      </Card>

      <Card className="management-content" styles={{ body: { padding: '24px' } }}>
        <Table
          columns={columns}
          dataSource={voices}
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
        title={editingVoice ? '编辑吐槽' : '新建吐槽'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
        className="management-modal"
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input placeholder="请输入标题" size="large" />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true, message: '请输入内容' }]}>
            <Input.TextArea rows={6} placeholder="请输入内容" />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select size="large" placeholder="请选择状态">
              <Select.Option value="NORMAL">正常</Select.Option>
              <Select.Option value="TO_PROJECT">转为项目</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
