import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Input as AntInput, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import type { User } from '../types/user';
import '../styles/management.css';

const { Search } = AntInput;

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadUsers();
  }, [pagination.current, pagination.pageSize]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(pagination.current, pagination.pageSize);
      // 检查响应格式
      const data = response?.data || response;
      const list = data?.list || data?.dataList || [];
      const total = data?.total || data?.totalCount || 0;
      
      setUsers(list);
      setPagination(prev => ({ ...prev, total }));
    } catch (error: any) {
      console.error('加载用户列表失败:', error);
      message.error(error?.response?.data?.message || '加载用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      message.success('删除成功');
      loadUsers();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await updateUser(editingUser.id!, values);
        message.success('更新成功');
      } else {
        await createUser(values);
        message.success('创建成功');
      }
      setModalVisible(false);
      loadUsers();
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
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: '全名',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    },
    {
      title: '签名',
      dataIndex: 'signature',
      key: 'signature',
      ellipsis: true,
      width: 200,
      render: (text: string) => text || '-',
    },
    {
      title: '积分',
      dataIndex: 'score',
      key: 'score',
      width: 120,
      sorter: (a: User, b: User) => (a.score || 0) - (b.score || 0),
      render: (score: number) => <span style={{ color: '#1890ff', fontWeight: 500 }}>{score || 0}</span>,
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
      render: (_: any, record: User) => (
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
            title="确定要删除这个用户吗？"
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
        <div className="header-title">用户管理</div>
        <div className="header-actions">
          <Search
            placeholder="搜索用户名或全名..."
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
              新建用户
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
        title={editingUser ? '编辑用户' : '新建用户'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
        className="management-modal"
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>
          <Form.Item name="fullName" label="全名">
            <Input placeholder="请输入全名" size="large" />
          </Form.Item>
          <Form.Item name="signature" label="签名">
            <Input.TextArea rows={4} placeholder="请输入签名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
