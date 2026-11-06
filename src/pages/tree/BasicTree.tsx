import { useState } from 'react'
import type { Key } from 'react'
import { Card, Tag, Tree, Typography } from 'antd'
import type { TreeDataNode } from 'antd'

const { Paragraph, Text } = Typography

/** treeData 是 Tree 最常用的数据源：key 必须唯一，children 表示下级节点 */
const treeData: TreeDataNode[] = [
  {
    title: '公司',
    key: 'company',
    children: [
      {
        title: '技术部',
        key: 'tech',
        children: [
          { title: '前端组', key: 'frontend' },
          { title: '后端组', key: 'backend' },
        ],
      },
      {
        title: '产品部',
        key: 'product',
        children: [{ title: '设计组', key: 'design' }],
      },
    ],
  },
]

/**
 * 示例 1：基础用法
 * - treeData 传入层级数据即可渲染
 * - defaultExpandAll 默认展开全部节点，showLine 显示层级连线
 * - onSelect 监听节点选中，selectedKeys 控制受控选中
 */
export default function BasicTree() {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])

  return (
    <Card title="示例 1：基础树 + 节点选中" extra={<Tag color="green">treeData / onSelect</Tag>}>
      <Tree
        treeData={treeData}
        defaultExpandAll
        showLine
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>当前选中：</Text>
        {selectedKeys.length > 0 ? selectedKeys.join(', ') : '未选择（点击节点试试）'}
      </Paragraph>
      <Paragraph type="secondary">
        <Text strong>要点：</Text>
        treeData 中 key 必须唯一；onSelect 回调第二、三个参数还包含节点信息和原生事件对象。
      </Paragraph>
    </Card>
  )
}
