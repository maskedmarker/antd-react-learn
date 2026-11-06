import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Tag,
  TimePicker,
  Typography,
  message,
} from 'antd'

const { Paragraph, Text } = Typography

/**
 * 示例 3：常用控件总览
 * - 表单控件需放在 Form.Item 中（用 name 绑定字段）
 * - Switch 等 boolean 受控控件用 valuePropName="checked"
 * - 日期控件返回 dayjs 对象（可用 .format() 格式化）
 */
export default function ControlsForm() {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const onFinish = (values) => {
    // 注意：日期字段的值是 dayjs 对象，JSON.stringify 会转成 ISO 字符串
    messageApi.success(`提交成功：${JSON.stringify(values)}`)
  }

  return (
    <Card
      title="示例 3：常用控件总览"
      extra={<Tag color="blue">Input / Select / DatePicker ...</Tag>}
    >
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 900 }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="年龄" name="age" rules={[{ required: true, message: '请输入年龄' }]}>
              <InputNumber min={0} max={150} style={{ width: '100%' }} placeholder="0~150" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别' }]}>
              <Radio.Group
                options={[
                  { label: '男', value: 'male' },
                  { label: '女', value: 'female' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="城市" name="city" rules={[{ required: true, message: '请选择城市' }]}>
              <Select
                allowClear
                showSearch
                placeholder="请选择城市（可搜索）"
                options={[
                  { label: '北京', value: 'beijing' },
                  { label: '上海', value: 'shanghai' },
                  { label: '广州', value: 'guangzhou' },
                  { label: '深圳', value: 'shenzhen' },
                  { label: '杭州', value: 'hangzhou' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="生日" name="birthday">
              <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="会议时间" name="meetingTime">
              <TimePicker style={{ width: '100%' }} placeholder="请选择时间" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="兴趣" name="hobbies">
              <Checkbox.Group
                options={[
                  { label: '篮球', value: 'basketball' },
                  { label: '足球', value: 'football' },
                  { label: '游泳', value: 'swimming' },
                  { label: '阅读', value: 'reading' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="信用评分" name="rate" initialValue={3}>
              <Rate />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="音量" name="volume" initialValue={70}>
              <Slider />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            {/* Switch 的受控值在 checked 属性上，需用 valuePropName 指定 */}
            <Form.Item label="是否公开" name="public" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item label="标签" name="tags">
              {/* open={false} 隐藏下拉，配合 mode="tags" 变成纯标签输入框 */}
              <Select mode="tags" placeholder="输入后回车创建标签" open={false} suffixIcon={null} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="个人简介" name="intro">
              <Input.TextArea rows={3} placeholder="介绍一下自己" showCount maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form>
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>要点：</Text>
        使用 Row/Col 栅格 + layout="vertical" 可以快速搭出响应式表单；
        日期控件返回 dayjs 对象（可用 format 格式化）；Select 支持 showSearch 搜索、mode="tags" 多值输入。
      </Paragraph>
    </Card>
  )
}
