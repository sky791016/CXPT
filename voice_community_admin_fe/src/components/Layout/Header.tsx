import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '64px' }}>
        创新平台后台管理
      </div>
    </AntHeader>
  );
}

