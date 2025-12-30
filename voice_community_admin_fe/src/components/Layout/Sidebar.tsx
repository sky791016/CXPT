import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  CommentOutlined,
  TagOutlined,
  TrophyOutlined,
  MessageOutlined,
  BulbOutlined,
  StarOutlined,
  ProjectOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/statistics',
    icon: <DashboardOutlined />,
    label: '数据统计',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: '/ideas',
    icon: <BulbOutlined />,
    label: 'Idea管理',
  },
  {
    key: '/gossiping',
    icon: <MessageOutlined />,
    label: '吐槽管理',
  },
  {
    key: '/voices',
    icon: <FileTextOutlined />,
    label: '心声管理',
  },
  {
    key: '/comments',
    icon: <CommentOutlined />,
    label: '评论管理',
  },
  {
    key: '/tags',
    icon: <TagOutlined />,
    label: '标签管理',
  },
  {
    key: '/medals',
    icon: <TrophyOutlined />,
    label: '勋章管理',
  },
  {
    key: '/scores',
    icon: <StarOutlined />,
    label: '积分管理',
  },
  {
    key: '/projects',
    icon: <ProjectOutlined />,
    label: '项目管理',
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider collapsible theme="light" width={200}>
      <div style={{ padding: '16px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
        后台管理系统
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}

