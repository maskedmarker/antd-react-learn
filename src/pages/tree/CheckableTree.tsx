import { useState } from 'react'
import type { Key } from 'react'
import { Button, Card, Space, Switch, Tag, Tree, Typography, message } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'

const { Paragraph, Text } = Typography

const treeData: TreeDataNode[] = [
  {
    title: '权限管理',
    key: 'perm',
    children: [
      {
        title: '用户管理',
        key: 'user',
        children: [
          { title: '查看用户', key: 'user-read' },
          { title: '编辑用户', key: 'user-edit' },
        ],
      },
      {
        title: '角色管理',
        key: 'role',
        children: [{ title: '分配权限', key: 'role-assign' }],
      },
    ],
  },
]

/**
 * 示例 2：受控选中（checkable）
 * - checkedKeys 受控管理选中状态，onCheck 回调拿到变化
 * - checkStrictly 为 false（默认）时父子节点联动；true 时父子互不影响
 * - 父子联动时 onCheck 的第一个参数是 { checked, halfChecked } 对象，
 *   checked 是勾选的 key，halfChecked 是半选（部分子节点选中）的 key
 */
export default function CheckableTree() {
  const [messageApi, contextHolder] = message.useMessage()
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(['user-read'])
  const [checkStrictly, setCheckStrictly] = useState(false)

  const onCheck: TreeProps['onCheck'] = (checked) => {
    // checkStrictly 为 false 时，checked 是 { checked, halfChecked } 对象；true 时是数组
    const keys = Array.isArray(checked) ? checked : checked.checked
    setCheckedKeys(keys)
  }

  return (
    <Card
      title="示例 2：受控选中 + 父子联动（常用于权限树）"
      extra={<Tag color="green">checkedKeys / checkStrictly / onCheck</Tag>}
    >
      {contextHolder}
      <Space style={{ marginBottom: 8 }}>
        <Text>父子联动（checkStrictly）：</Text>
        <Switch
          checked={checkStrictly}
          onChange={setCheckStrictly}
          checkedChildren="关"
          unCheckedChildren="开"
        />
      </Space>
      <Tree
        checkable
        checkStrictly={checkStrictly}
        treeData={treeData}
        defaultExpandAll
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>已勾选：</Text>
        {checkedKeys.length > 0 ? checkedKeys.join(', ') : '无'}
      </Paragraph>
      <Button
        type="primary"
        onClick={() => messageApi.info(`当前选中的 key：${checkedKeys.join(', ') || '空'}`)}
      >
        获取选中节点
      </Button>
    </Card>
  )
}
