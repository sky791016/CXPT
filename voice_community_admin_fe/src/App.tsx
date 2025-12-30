import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import UserManagement from './pages/UserManagement';
import VoiceManagement from './pages/VoiceManagement';
import GossipingManagement from './pages/GossipingManagement';
import IdeaManagement from './pages/IdeaManagement';
import CommentManagement from './pages/CommentManagement';
import TagManagement from './pages/TagManagement';
import MedalManagement from './pages/MedalManagement';
import ScoreManagement from './pages/ScoreManagement';
import ProjectManagement from './pages/ProjectManagement';
import Statistics from './pages/Statistics';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ margin: '24px 16px', padding: 0, background: '#f5f7fa', minHeight: 'calc(100vh - 48px)' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/statistics" replace />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/voices" element={<VoiceManagement />} />
                <Route path="/gossiping" element={<GossipingManagement />} />
                <Route path="/ideas" element={<IdeaManagement />} />
                <Route path="/comments" element={<CommentManagement />} />
                <Route path="/tags" element={<TagManagement />} />
                <Route path="/medals" element={<MedalManagement />} />
                <Route path="/scores" element={<ScoreManagement />} />
                <Route path="/projects" element={<ProjectManagement />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
