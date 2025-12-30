import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, message, Input as AntInput, Card } from 'antd';
import { EditOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { getUserScores, updateUserScore, type UserScore } from '../api/scoreApi';
import '../styles/management.css';

const { Search } = AntInput;

export default function ScoreManagement() {
  const [users, setUsers] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserScore | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadUsers();
  }, [pagination.current, pagination.pageSize]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUserScores(pagination.current, pagination.pageSize);
      const data = response?.data || response;
      const list = data?.list || data?.dataList || [];
      const total = data?.total || data?.totalCount || 0;
      
      setUsers(list);
      setPagination(prev => ({ ...prev, total }));
    } catch (error: any) {
      console.error('加载用户积分列表失败:', error);
      message.error(error?.response?.data?.message || '加载用户积分列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: UserScore) => {
    setEditingUser(user);
    form.setFieldsValue({ score: user.score || 0 });
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser && editingUser.userId) {
        await updateUserScore(editingUser.userId, values.score);
        message.success('更新成功');
        setModalVisible(false);
        loadUsers();
      }
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    loadUsers();
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
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: '姓名',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    },
    {
      title: '积分',
      dataIndex: 'score',
      key: 'score',
      width: 120,
      sorter: (a: UserScore, b: UserScore) => (a.score || 0) - (b.score || 0),
      render: (score: number) => (
        <span style={{ color: '#1890ff', fontWeight: 600, fontSize: '16px' }}>
          {score || 0}
        </span>
      ),
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
      width: 120,
      fixed: 'right' as const,
      render: (_: any, record: UserScore) => (
        <Button 
          type="link" 
          icon={<EditOutlined />} 
          onClick={() => handleEdit(record)}
          style={{ padding: 0 }}
        >
          编辑积分
        </Button>
      ),
    },
  ];

  return (
    <div className="management-container">
      <Card className="management-header" styles={{ body: { padding: '24px' } }}>
        <div className="header-title">积分管理</div>
        <div className="header-actions">
          <Search
            placeholder="搜索用户名或姓名..."
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
              onClick={loadUsers}
            >
              刷新
            </Button>
          </div>
        </div>
      </Card>

      <Card className="management-content" styles={{ body: { padding: '24px' } }}>
        <Table
          columns={columns}
          dataSource={users}
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
        title="编辑用户积分"
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={500}
        className="management-modal"
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="用户">
            <Input value={editingUser?.fullName || editingUser?.userName} disabled size="large" />
          </Form.Item>
          <Form.Item name="score" label="积分" rules={[{ required: true, message: '请输入积分' }]}>
            <InputNumber min={0} style={{ width: '100%' }} size="large" placeholder="请输入积分" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
