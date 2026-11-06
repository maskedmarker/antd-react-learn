import { useMemo, useState } from 'react'
import { Card, Input, Tag, Tree, Typography } from 'antd'

const { Paragraph, Text } = Typography

const treeData = [
  {
    title: '前端技术',
    key: 'frontend',
    children: [
      {
        title: '框架',
        key: 'framework',
        children: [
          { title: 'React', key: 'react' },
          { title: 'Vue', key: 'vue' },
          { title: 'Angular', key: 'angular' },
        ],
      },
      {
        title: '构建工具',
        key: 'build',
        children: [
          { title: 'Vite', key: 'vite' },
          { title: 'Webpack', key: 'webpack' },
        ],
      },
    ],
  },
]

/** 把树拍平成 [{ key, title }] 列表，用于搜索时计算需要展开的父节点 */
const generateList = (nodes) => {
  const list = []
  const walk = (items) => {
    for (const node of items) {
      list.push({ key: node.key, title: node.title })
      if (node.children) walk(node.children)
    }
  }
  walk(nodes)
  return list
}

/** 查找 key 的父节点 key（用于自动展开） */
const getParentKey = (key, tree) => {
  let parentKey
  for (const node of tree) {
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

/**
 * 示例 5：关键字搜索
 * - 输入关键字后自动展开包含匹配节点的父级
 * - 高亮通过在 treeData 中替换 title 为 JSX 实现
 * - expandedKeys 受控后需配合 autoExpandParent 处理「首次自动展开」
 */
export default function SearchTree() {
  const [searchValue, setSearchValue] = useState('')
  const [expandedKeys, setExpandedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const dataList = useMemo(() => generateList(treeData), [])

  const onSearch = (value) => {
    // 找出所有标题匹配关键字的节点，展开它们的父级
    const newExpandedKeys = dataList
      .filter((item) => item.title.includes(value))
      .map((item) => getParentKey(item.key, treeData))
      .filter((key) => key !== undefined)
    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  // 高亮标题中匹配的关键字
  const highlightTreeData = useMemo(() => {
    const loop = (data) =>
      data.map((item) => {
        const strTitle = item.title
        const index = strTitle.indexOf(searchValue)
        const beforeStr = strTitle.substring(0, index)
        const afterStr = strTitle.slice(index + searchValue.length)
        const title =
          searchValue && index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            strTitle
          )
        return {
          ...item,
          title,
          children: item.children ? loop(item.children) : undefined,
        }
      })
    return loop(treeData)
  }, [searchValue])

  return (
    <Card title="示例 5：关键字搜索" extra={<Tag color="green">受控 expandedKeys / 高亮</Tag>}>
      <Input.Search
        style={{ marginBottom: 8, maxWidth: 320 }}
        placeholder="输入关键字（如 React）"
        allowClear
        onSearch={onSearch}
        onChange={(e) => {
          // 清空输入时恢复初始状态
          if (!e.target.value) {
            setSearchValue('')
            setExpandedKeys([])
            setAutoExpandParent(true)
          }
        }}
      />
      <Tree
        treeData={highlightTreeData}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onExpand={(keys) => {
          setExpandedKeys(keys)
          setAutoExpandParent(false)
        }}
      />
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>要点：</Text>
        受控 expandedKeys 后，autoExpandParent 需要配合使用：搜索时置 true
        让新展开的父节点生效，用户手动展开时置 false 避免已折叠节点被重新打开。
      </Paragraph>
    </Card>
  )
}
