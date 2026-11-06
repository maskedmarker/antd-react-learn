import {
  ApartmentOutlined,
  FormOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Typography, theme } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Sider, Header, Content } = Layout

/** 侧边栏菜单：新增页面时在这里加一项，key 与路由 path 保持一致 */
const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: '首页' },
  { key: '/form', icon: <FormOutlined />, label: 'Form 表单' },
  { key: '/tree', icon: <ApartmentOutlined />, label: 'Tree 树形控件' },
]

/**
 * 整体布局：左侧菜单 + 顶栏 + 内容区
 * 子路由页面通过 <Outlet /> 渲染到内容区
 */
export default function BasicLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { token } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" breakpoint="lg" collapsible>
        <div className="logo">AntD 学习</div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: token.colorBgContainer,
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            Ant Design React 学习 Demo
          </Typography.Title>
        </Header>
        <Content style={{ margin: 24 }}>
          {/* 子路由页面渲染在这里 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
