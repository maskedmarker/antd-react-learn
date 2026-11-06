import { Space, Typography } from 'antd'
import BasicForm from './BasicForm'
import ControlsForm from './ControlsForm'
import DependentForm from './DependentForm'
import DynamicForm from './DynamicForm'
import LayoutForm from './LayoutForm'

const { Title, Paragraph, Link } = Typography

/**
 * Form 表单演示页
 * 官方文档：https://ant.design/components/form-cn
 *
 * 本页包含 5 个示例，从基础到进阶：
 * 1. BasicForm     基础表单 + 校验规则
 * 2. LayoutForm    三种布局切换
 * 3. ControlsForm  常用控件总览
 * 4. DynamicForm   动态增删表单项（Form.List）
 * 5. DependentForm 表单联动（useWatch / shouldUpdate）
 */
export default function FormDemo() {
  return (
    <div>
      <Title level={4}>Form 表单</Title>
      <Paragraph type="secondary">
        表单用于收集和校验用户输入，是后台系统中最常用的组件之一。官方文档详见
        <Link href="https://ant.design/components/form-cn" target="_blank">
          Form 表单
        </Link>
        。
      </Paragraph>
      <Space direction="vertical" size={16} style={{ display: 'flex' }}>
        <BasicForm />
        <LayoutForm />
        <ControlsForm />
        <DynamicForm />
        <DependentForm />
      </Space>
    </div>
  )
}
