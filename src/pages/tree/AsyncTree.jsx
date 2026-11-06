import { useState } from 'react'
import { Card, Tag, Tree, Typography } from 'antd'

const { Paragraph, Text } = Typography

const initialTreeData = [
  { title: '根目录（点击展开自动加载子节点）', key: 'root' },
  { title: '懒加载目录', key: 'lazy' },
]

/** 递归更新：把新子节点挂到 key 对应的节点上 */
const updateTreeData = (list, key, children) =>
  list.map((node) => {
    if (node.key === key) {
      return { ...node, children }
    }
    if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) }
    }
    return node
  })

/**
 * 示例 4：异步加载子节点
 * - loadData 返回 Promise，加载期间节点自动显示 loading 动画
 * - 已有 children 的节点不会再次触发 loadData
 * - isLeaf 标记叶子节点，叶子节点不显示展开箭头
 */
export default function AsyncTree() {
  const [treeData, setTreeData] = useState(initialTreeData)

  const onLoadData = ({ key, children }) =>
    new Promise((resolve) => {
      if (children) {
        resolve()
        return
      }
      // 模拟接口请求，1 秒后返回子节点
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            { title: `子节点 ${Date.now()}`, key: `${key}-${Date.now()}` },
            { title: '叶子节点（不可再展开）', key: `${key}-leaf`, isLeaf: true },
          ]),
        )
        resolve()
      }, 1000)
    })

  return (
    <Card title="示例 4：异步加载子节点" extra={<Tag color="green">loadData / isLeaf</Tag>}>
      <Tree treeData={treeData} loadData={onLoadData} />
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>要点：</Text>
        展开节点时触发 loadData，返回 Promise 期间自动显示 loading；
        适用于目录树、组织架构等「按需加载」场景，避免一次性传输全部数据。
      </Paragraph>
    </Card>
  )
}
