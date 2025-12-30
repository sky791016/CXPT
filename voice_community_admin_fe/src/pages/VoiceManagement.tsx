import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getVoices, createVoice, updateVoice, deleteVoice } from '../api/voiceApi';
import type { Voice } from '../types/voice';

export default function VoiceManagement() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVoice, setEditingVoice] = useState<Voice | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    loadVoices();
  }, [pagination.current, pagination.pageSize]);

  const loadVoices = async () => {
    setLoading(true);
    try {
      const response = await getVoices(pagination.current, pagination.pageSize);
      setVoices(response.data.list);
      setPagination(prev => ({ ...prev, total: response.data.total }));
    } catch (error) {
      message.error('加载心声列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingVoice(null);
    form.resetFields();
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Voice) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条心声吗？"
            onConfirm={() => handleDelete(record.id!)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新建心声
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={voices}
        loading={loading}
        rowKey="id"
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => setPagination(prev => ({ ...prev, current: page, pageSize })),
        }}
      />
      <Modal
        title={editingVoice ? '编辑心声' : '新建心声'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="IDEA">创意</Select.Option>
              <Select.Option value="GOSSIPING">员工声音</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select>
              <Select.Option value="NORMAL">正常</Select.Option>
              <Select.Option value="TO_PROJECT">转为项目</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

