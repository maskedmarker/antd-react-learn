import { Space, Typography } from 'antd'
import AsyncTree from './AsyncTree'
import BasicTree from './BasicTree'
import CheckableTree from './CheckableTree'
import DraggableTree from './DraggableTree'
import SearchTree from './SearchTree'

const { Title, Paragraph, Link } = Typography

/**
 * Tree 树形控件演示页
 * 官方文档：https://ant.design/components/tree-cn
 *
 * 本页包含 5 个示例，从基础到进阶：
 * 1. BasicTree      基础树 + 节点选中
 * 2. CheckableTree  受控选中 + 父子联动（权限树）
 * 3. DraggableTree  拖拽排序
 * 4. AsyncTree      异步加载子节点
 * 5. SearchTree     关键字搜索
 */
export default function TreeDemo() {
  return (
    <div>
      <Title level={4}>Tree 树形控件</Title>
      <Paragraph type="secondary">
        树形控件用于展示层级结构数据（如组织架构、目录树、权限树）。官方文档详见
        <Link href="https://ant.design/components/tree-cn" target="_blank">
          Tree 树形控件
        </Link>
        。
      </Paragraph>
      <Space direction="vertical" size={16} style={{ display: 'flex' }}>
        <BasicTree />
        <CheckableTree />
        <DraggableTree />
        <AsyncTree />
        <SearchTree />
      </Space>
    </div>
  )
}
