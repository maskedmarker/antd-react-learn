import { Navigate, Route, Routes } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import Home from './pages/Home'
import FormDemo from './pages/form/FormDemo'
import TreeDemo from './pages/tree/TreeDemo'

/**
 * 路由表：
 * - /      首页（Home）
 * - /form  Form 表单演示页
 * - /tree  Tree 树形控件演示页
 *
 * 新增组件演示页时，在这里注册路由即可（菜单见 layouts/BasicLayout.jsx）
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<Home />} />
        <Route path="form" element={<FormDemo />} />
        <Route path="tree" element={<TreeDemo />} />
        {/* 未匹配到的路径重定向回首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
