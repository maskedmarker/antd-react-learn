import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, InputNumber, Space, Tag, Typography, message } from 'antd'

const { Paragraph, Text } = Typography

interface TeamValues {
  members: { name: string; age: number }[]
}

/**
 * 示例 4：动态增删表单项（Form.List）
 * - Form.List 的 name 是数组字段名，fields 是当前列表项
 * - add / remove 增删条目，每个条目内嵌的 Form.Item 用 [name, '字段'] 命名
 * - 注意：条目内需要展开 restField（包含 key 和 name），key 是 React 渲染必需的
 */
export default function DynamicForm() {
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <Card
      title="示例 4：动态增删表单项（Form.List）"
      extra={<Tag color="blue">Form.List / add / remove</Tag>}
    >
      {contextHolder}
      <Form<TeamValues>
        name="dynamic"
        initialValues={{ members: [{ name: '张三', age: 18 }] }}
        onFinish={(values) => messageApi.success(`提交成功：${JSON.stringify(values)}`)}
        autoComplete="off"
      >
        <Form.List name="members">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: '请输入姓名' }]}
                  >
                    <Input placeholder="姓名" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'age']}
                    rules={[{ required: true, message: '请输入年龄' }]}
                  >
                    <InputNumber placeholder="年龄" min={0} max={150} />
                  </Form.Item>
                  <MinusCircleOutlined
                    style={{ color: '#ff4d4f', cursor: 'pointer' }}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add()}>
                  添加成员
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <Paragraph type="secondary">
        <Text strong>要点：</Text>
        fields 的每一项必须把 key 展开到外层元素上（否则 React 会告警）；
        onFinish 拿到的 members 是数组，适合「行编辑」类场景（如收货地址列表、成员名单）。
      </Paragraph>
    </Card>
  )
}
