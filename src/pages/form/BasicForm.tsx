import { Button, Card, Checkbox, Form, Input, Space, Tag, Typography, message } from 'antd'

const { Paragraph, Text } = Typography

interface RegisterValues {
  username: string
  password: string
  confirm: string
  remember: boolean
}

/**
 * 示例 1：基础用法 + 校验规则
 * - Form.Item 通过 name 绑定字段，rules 定义校验规则
 * - onFinish / onFinishFailed 分别处理提交成功与校验失败
 * - Checkbox 等「受控值为 boolean」的控件需要 valuePropName="checked"
 * - dependencies + 自定义 validator 可实现跨字段校验（确认密码）
 */
export default function BasicForm() {
  // antd v5 推荐用 useMessage 获取带上下文的 message 实例（静态调用会丢失主题上下文）
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm<RegisterValues>()

  const onFinish = (values: RegisterValues) => {
    messageApi.success(`提交成功：${JSON.stringify(values)}`)
  }

  return (
    <Card
      title="示例 1：基础表单 + 校验规则"
      extra={<Tag color="blue">rules / onFinish / valuePropName</Tag>}
    >
      {contextHolder}
      <Form<RegisterValues>
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 640 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={() => messageApi.error('校验未通过，请检查表单内容')}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, max: 12, message: '长度需为 3~12 个字符' },
          ]}
        >
          <Input placeholder="3~12 个字符" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/, message: '至少 6 位，且同时包含字母和数字' },
          ]}
        >
          <Input.Password placeholder="至少 6 位，包含字母和数字" />
        </Form.Item>

        {/* dependencies 声明依赖字段，自定义 validator 中通过 getFieldValue 读取其值 */}
        <Form.Item
          label="确认密码"
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次输入的密码不一致'))
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>要点：</Text>
        必填用 required，格式校验可用 pattern 正则或自定义 validator；
        跨字段校验用 dependencies 关联其他字段，提交成功后可在 onFinish 中拿到全部值。
      </Paragraph>
    </Card>
  )
}
