import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, Select, DatePicker, message, Popconfirm, Input as AntInput, Card, Tag, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { getProjects, createProject, updateProject, deleteProject, type Project } from '../api/projectApi';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import '../styles/management.css';

const { Search } = AntInput;
const { TextArea } = Input;

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadProjects();
  }, [pagination.current, pagination.pageSize]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects(pagination.current, pagination.pageSize);
      const data = response?.data || response;
      const list = data?.list || data?.dataList || [];
      const total = data?.total || data?.totalCount || 0;
      
      setProjects(list);
      setPagination(prev => ({ ...prev, total }));
    } catch (error: any) {
      console.error('加载项目列表失败:', error);
      message.error(error?.response?.data?.message || '加载项目列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProject(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    form.setFieldsValue({
      ...project,
      startTime: project.startTime ? dayjs(project.startTime) : null,
      endTime: project.endTime ? dayjs(project.endTime) : null,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id);
      message.success('删除成功');
      loadProjects();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const projectData = {
        ...values,
        startTime: values.startTime ? values.startTime.format('YYYY-MM-DD HH:mm:ss') : null,
        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss') : null,
      };
      if (editingProject) {
        await updateProject(editingProject.id!, projectData);
        message.success('更新成功');
      } else {
        await createProject(projectData);
        message.success('创建成功');
      }
      setModalVisible(false);
      loadProjects();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    loadProjects();
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
      title: '项目名称',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 200,
    },
    {
      title: '负责人ID',
      dataIndex: 'leaderId',
      key: 'leaderId',
      width: 100,
    },
    {
      title: '当前阶段',
      dataIndex: 'currentStage',
      key: 'currentStage',
      width: 150,
      render: (stage: string) => stage || '-',
    },
    {
      title: '进度',
      dataIndex: 'overallProgress',
      key: 'overallProgress',
      width: 150,
      render: (progress: number) => (
        <Progress 
          percent={progress || 0} 
          size="small" 
          status={progress === 100 ? 'success' : 'active'}
        />
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          'IN_PROGRESS': { text: '进行中', color: 'processing' },
          'REVIEWING': { text: '审核中', color: 'warning' },
          'COMPLETED': { text: '已完成', color: 'success' },
          'TERMINATED': { text: '已终止', color: 'error' },
        };
        const statusInfo = statusMap[status] || { text: status, color: 'default' };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
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
      render: (_: any, record: Project) => (
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
            title="确定要删除这个项目吗？"
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
        <div className="header-title">项目管理</div>
        <div className="header-actions">
          <Search
            placeholder="搜索项目名称..."
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
              onClick={loadProjects}
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
              新建项目
            </Button>
          </div>
        </div>
      </Card>

      <Card className="management-content" styles={{ body: { padding: '24px' } }}>
        <Table
          columns={columns}
          dataSource={projects}
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
        title={editingProject ? '编辑项目' : '新建项目'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
        className="management-modal"
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="项目名称" rules={[{ required: true, message: '请输入项目名称' }]}>
            <Input placeholder="请输入项目名称" size="large" />
          </Form.Item>
          <Form.Item name="description" label="项目描述">
            <TextArea rows={4} placeholder="请输入项目描述" />
          </Form.Item>
          <Form.Item name="leaderId" label="负责人ID" rules={[{ required: true, message: '请输入负责人ID' }]}>
            <InputNumber style={{ width: '100%' }} placeholder="请输入负责人ID" size="large" />
          </Form.Item>
          <Form.Item name="targetIndicators" label="目标指标">
            <TextArea rows={3} placeholder="请输入目标指标" />
          </Form.Item>
          <Form.Item name="startTime" label="开始时间">
            <DatePicker showTime style={{ width: '100%' }} size="large" />
          </Form.Item>
          <Form.Item name="endTime" label="结束时间">
            <DatePicker showTime style={{ width: '100%' }} size="large" />
          </Form.Item>
          <Form.Item name="currentStage" label="当前阶段">
            <Input placeholder="请输入当前阶段" size="large" />
          </Form.Item>
          <Form.Item name="overallProgress" label="整体进度">
            <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" size="large" />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select size="large" placeholder="请选择状态">
              <Select.Option value="IN_PROGRESS">进行中</Select.Option>
              <Select.Option value="REVIEWING">审核中</Select.Option>
              <Select.Option value="COMPLETED">已完成</Select.Option>
              <Select.Option value="TERMINATED">已终止</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
