import {
  ApartmentOutlined,
  ArrowRightOutlined,
  FormOutlined,
} from '@ant-design/icons'
import { Card, Col, Divider, Row, Space, Steps, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

/** 演示页入口列表：新增演示页时在这里加一张卡片 */
const demoList = [
  {
    path: '/form',
    icon: <FormOutlined style={{ fontSize: 28, color: '#1677ff' }} />,
    title: 'Form 表单',
    description: '基础表单与校验规则、三种布局切换、常用控件总览、动态增删表单项、表单联动',
    tags: ['Form.Item', 'rules', 'Form.List', 'useWatch'],
  },
  {
    path: '/tree',
    icon: <ApartmentOutlined style={{ fontSize: 28, color: '#52c41a' }} />,
    title: 'Tree 树形控件',
    description: '基础树形结构、受控选中与父子关联、拖拽排序、异步加载子节点、关键字搜索',
    tags: ['treeData', 'onCheck', 'draggable', 'loadData'],
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <Title level={4}>欢迎 👋</Title>
      <Paragraph type="secondary">
        这是一个用于学习 Ant Design React 组件的 Demo 环境，基于
        <Text code>Vite + React + TypeScript + antd 5 + React Router</Text>
        搭建。左侧菜单可切换到不同组件的演示页，每个演示页都包含可交互的示例和要点说明。
      </Paragraph>

      <Row gutter={[16, 16]}>
        {demoList.map((demo) => (
          <Col key={demo.path} xs={24} md={12}>
            <Card hoverable onClick={() => navigate(demo.path)}>
              <Space align="start" size={16}>
                {demo.icon}
                <div>
                  <Space>
                    <Title level={5} style={{ margin: 0 }}>
                      {demo.title}
                    </Title>
                    <ArrowRightOutlined />
                  </Space>
                  <Paragraph type="secondary" style={{ margin: '8px 0' }}>
                    {demo.description}
                  </Paragraph>
                  <Space size={[0, 8]} wrap>
                    {demo.tags.map((tag) => (
                      <Tag key={tag} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <Title level={5}>如何添加新的组件演示页？</Title>
      <Steps
        size="small"
        direction="vertical"
        items={[
          {
            title: '新建页面组件',
            description: (
              <>
                在 <Text code>src/pages</Text> 下创建目录和文件，如
                <Text code> src/pages/table/TableDemo.tsx</Text>
              </>
            ),
          },
          {
            title: '注册路由',
            description: (
              <>
                在 <Text code>src/App.tsx</Text> 中添加
                <Text code>{' <Route path="table" element={<TableDemo />} />'}</Text>
              </>
            ),
          },
          {
            title: '添加菜单项',
            description: (
              <>
                在 <Text code>src/layouts/BasicLayout.tsx</Text> 的
                <Text code> menuItems</Text> 中加一项（key 与路由 path 一致）
              </>
            ),
          },
          {
            title: '添加入口卡片（可选）',
            description: (
              <>
                在 <Text code>src/pages/Home.tsx</Text> 的
                <Text code> demoList</Text> 中加一条
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
