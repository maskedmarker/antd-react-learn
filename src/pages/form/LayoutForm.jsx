import { useState } from 'react'
import { Card, Form, Input, InputNumber, Segmented, Tag, Typography } from 'antd'

const { Paragraph, Text } = Typography

/**
 * 示例 2：三种表单布局
 * - horizontal：label 与控件同行（用 labelCol / wrapperCol 栅格控制宽度）
 * - vertical：label 在控件上方（antd 默认布局）
 * - inline：所有表单项在同一行内（无 label，适合工具栏筛选场景）
 */
export default function LayoutForm() {
  const [layout, setLayout] = useState('horizontal')

  // horizontal 布局需要设置 label 和控件的栅格宽度，其余布局不需要
  const formLayout =
    layout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : {}

  return (
    <Card
      title="示例 2：三种布局切换"
      extra={<Tag color="blue">layout / labelCol / wrapperCol</Tag>}
    >
      <Segmented
        options={['horizontal', 'vertical', 'inline']}
        value={layout}
        onChange={setLayout}
        style={{ marginBottom: 16 }}
      />
      <Form {...formLayout} layout={layout} style={{ maxWidth: 640 }}>
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber min={0} max={150} placeholder="请输入年龄" />
        </Form.Item>
        <Form.Item label="备注" name="note">
          <Input placeholder="切换到 inline 布局后 label 会被忽略，注意观察差异" />
        </Form.Item>
      </Form>
      <Paragraph type="secondary">
        <Text strong>要点：</Text>
        Form 的 layout 属性可整体切换布局；inline 布局只适合少量字段、无 label 的场景，
        配合表格筛选或工具栏使用较多。
      </Paragraph>
    </Card>
  )
}
