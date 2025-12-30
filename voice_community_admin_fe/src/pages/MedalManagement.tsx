import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Input as AntInput, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { getMedals, createMedal, updateMedal, deleteMedal, type Medal } from '../api/medalApi';
import '../styles/management.css';

const { Search } = AntInput;

export default function MedalManagement() {
  const [medals, setMedals] = useState<Medal[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMedal, setEditingMedal] = useState<Medal | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadMedals();
  }, [pagination.current, pagination.pageSize]);

  const loadMedals = async () => {
    setLoading(true);
    try {
      const response = await getMedals(pagination.current, pagination.pageSize);
      const data = response?.data || response;
      const list = data?.list || data?.dataList || [];
      const total = data?.total || data?.totalCount || 0;
      
      setMedals(list);
      setPagination(prev => ({ ...prev, total }));
    } catch (error: any) {
      console.error('加载勋章列表失败:', error);
      message.error(error?.response?.data?.message || '加载勋章列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingMedal(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (medal: Medal) => {
    setEditingMedal(medal);
    form.setFieldsValue(medal);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMedal(id);
      message.success('删除成功');
      loadMedals();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingMedal) {
        await updateMedal(editingMedal.id!, values);
        message.success('更新成功');
      } else {
        await createMedal(values);
        message.success('创建成功');
      }
      setModalVisible(false);
      loadMedals();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    loadMedals();
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
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 300,
      render: (text: string) => text || '-',
    },
    {
      title: '图标URL',
      dataIndex: 'iconUrl',
      key: 'iconUrl',
      ellipsis: true,
      width: 200,
      render: (url: string) => url ? <a href={url} target="_blank" rel="noopener noreferrer">查看</a> : '-',
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
      render: (_: any, record: Medal) => (
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
            title="确定要删除这枚勋章吗？"
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
        <div className="header-title">勋章管理</div>
        <div className="header-actions">
          <Search
            placeholder="搜索勋章名称..."
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
              onClick={loadMedals}
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
              新建勋章
            </Button>
          </div>
        </div>
      </Card>

      <Card className="management-content" styles={{ body: { padding: '24px' } }}>
        <Table
          columns={columns}
          dataSource={medals}
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
        title={editingMedal ? '编辑勋章' : '新建勋章'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
        className="management-modal"
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="code" label="编码" rules={[{ required: true, message: '请输入编码' }]}>
            <Input placeholder="请输入编码" size="large" />
          </Form.Item>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder="请输入名称" size="large" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={4} placeholder="请输入描述" />
          </Form.Item>
          <Form.Item name="iconUrl" label="图标URL">
            <Input placeholder="请输入图标URL" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
