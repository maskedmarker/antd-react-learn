import { Button, Card, Form, Input, Select, Space, Switch, Tag, Typography, message } from 'antd'

const { Paragraph, Text } = Typography

const districtOptions: Record<string, { label: string; value: string }[]> = {
  beijing: [
    { label: '朝阳区', value: 'chaoyang' },
    { label: '海淀区', value: 'haidian' },
  ],
  shanghai: [
    { label: '浦东新区', value: 'pudong' },
    { label: '徐汇区', value: 'xuhui' },
  ],
}

/**
 * 示例 5：表单联动
 * 方式一：Form.useWatch 监听字段值，控制其他字段显隐（条件渲染）
 * 方式二：Form.Item 的 shouldUpdate + 渲染函数，控制其他字段的可用性
 */
export default function DependentForm() {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  // 监听 needInvoice 字段的变化，用于条件渲染发票信息
  const needInvoice = Form.useWatch('needInvoice', form)

  return (
    <Card title="示例 5：表单联动" extra={<Tag color="blue">useWatch / shouldUpdate / dependencies</Tag>}>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 480 }}
        onFinish={(values) => messageApi.success(`提交成功：${JSON.stringify(values)}`)}
      >
        <Form.Item label="城市" name="city" rules={[{ required: true, message: '请选择城市' }]}>
          <Select
            placeholder="请选择城市"
            options={[
              { label: '北京', value: 'beijing' },
              { label: '上海', value: 'shanghai' },
            ]}
            onChange={() => form.setFieldValue('district', undefined)}
          />
        </Form.Item>

        {/* 方式二：shouldUpdate 返回 true 时重新渲染 children 函数，用于禁用/启用控件 */}
        <Form.Item shouldUpdate={(prev, cur) => prev.city !== cur.city} noStyle>
          {({ getFieldValue }) => (
            <Form.Item label="区县" name="district">
              <Select
                placeholder={getFieldValue('city') ? '请选择区县' : '请先选择城市'}
                disabled={!getFieldValue('city')}
                options={districtOptions[getFieldValue('city') as string] ?? []}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item label="需要开发票" name="needInvoice" valuePropName="checked" initialValue={false}>
          <Switch />
        </Form.Item>

        {/* 方式一：useWatch 监听开关值，条件渲染发票信息 */}
        {needInvoice && (
          <>
            <Form.Item
              label="发票抬头"
              name="invoiceTitle"
              rules={[{ required: true, message: '请输入发票抬头' }]}
            >
              <Input placeholder="请输入公司名称" />
            </Form.Item>
            <Form.Item label="税号" name="taxNo" rules={[{ required: true, message: '请输入税号' }]}>
              <Input placeholder="请输入纳税人识别号" />
            </Form.Item>
          </>
        )}

        <Space>
          <Button type="primary" onClick={() => form.submit()}>
            提交
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form>
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        <Text strong>要点：</Text>
        useWatch 适合「显示/隐藏」场景，shouldUpdate 适合「只改变可用性/样式」场景；
        被条件渲染卸载的字段默认会保留值（preserve 默认为 true），再次显示时值仍在。
      </Paragraph>
    </Card>
  )
}
