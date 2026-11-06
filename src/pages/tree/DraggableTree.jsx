import { useState } from 'react'
import { Card, Tag, Tree, Typography } from 'antd'

const { Paragraph, Text } = Typography

const initialTreeData = [
  {
    title: '计划列表',
    key: 'plan',
    children: [
      {
        title: '工作',
        key: 'work',
        children: [
          { title: '写周报', key: 'work-1' },
          { title: '代码评审', key: 'work-2' },
        ],
      },
      {
        title: '生活',
        key: 'life',
        children: [
          { title: '健身', key: 'life-1' },
          { title: '读书', key: 'life-2' },
        ],
      },
    ],
  },
]

/**
 * 示例 3：拖拽排序
 * - draggable 开启拖拽，onDrop 回调中根据 dropToGap / dropPosition 重新组织数据
 * - pos 是形如 '0-0-1' 的节点路径字符串，用于判断插入位置
 * - 注意：Tree 只负责 UI 与回调，数据重排需要自己在 onDrop 中完成
 */
export default function DraggableTree() {
  const [treeData, setTreeData] = useState(initialTreeData)

  const onDrop = (info) => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    // dropPosition 减去末尾索引，得到相对目标节点的位置：-1 表示插到其前面
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    // 递归遍历树，找到 key 对应的节点后执行 callback
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          callback(data[i], i, data)
          return
        }
        if (data[i].children) {
          loop(data[i].children, key, callback)
        }
      }
    }

    const data = [...treeData]

    // 1. 从原位置删除被拖拽的节点
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!dragObj) return

    if (!info.dropToGap) {
      // 2a. 拖到节点上：作为其子节点插入
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        item.children.unshift(dragObj)
      })
    } else {
      // 2b. 拖到间隙：插入到目标节点前面或后面
      let targetArr = []
      let targetIndex = 0
      loop(data, dropKey, (_item, index, arr) => {
        targetArr = arr
        targetIndex = index
      })
      if (dropPosition === -1) {
        targetArr.splice(targetIndex, 0, dragObj)
      } else {
        targetArr.splice(targetIndex + 1, 0, dragObj)
      }
    }

    setTreeData(data)
  }

  return (
    <Card title="示例 3：拖拽排序" extra={<Tag color="green">draggable / onDrop / dropToGap</Tag>}>
      <Tree treeData={treeData} defaultExpandAll draggable blockNode onDrop={onDrop} />
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>要点：</Text>
        info.node.pos（如 '0-0-1'）表示节点在树中的路径，结合 dropPosition 可算出插入位置；
        拖到节点上会变成其子节点（dropToGap=false），拖到节点之间则插入前后。
      </Paragraph>
    </Card>
  )
}
