import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import UserManagement from './pages/UserManagement';
import VoiceManagement from './pages/VoiceManagement';
import Statistics from './pages/Statistics';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/statistics" replace />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/voices" element={<VoiceManagement />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
