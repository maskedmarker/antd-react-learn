# antd-react-learn

用于学习 Ant Design React 组件的 Demo 环境。

> 分支说明：`main` 分支为 TypeScript 版本，`js` 分支为 JavaScript 版本（当前）。

## 技术栈

- [Vite](https://vite.dev/) 6 + [React](https://react.dev/) 18 + JavaScript
- [Ant Design](https://ant.design/) 5 + @ant-design/icons
- [React Router](https://reactrouter.com/) 7

## 快速开始

```bash
npm install
npm run dev        # 启动开发服务器，默认 http://localhost:5173
npm run build      # 构建生产版本
npm run preview    # 本地预览构建产物
```

## 目录结构

```
src/
├── main.jsx                     # 入口：挂载 React + BrowserRouter
├── App.jsx                      # 路由表
├── layouts/
│   └── BasicLayout.jsx          # 整体布局：侧边菜单 + 顶栏 + 内容区
└── pages/
    ├── Home.jsx                 # 首页：演示页入口卡片
    ├── form/
    │   ├── FormDemo.jsx         # Form 演示页（汇总 5 个示例）
    │   └── *.jsx                # 各示例（一个文件一个知识点）
    └── tree/
        ├── TreeDemo.jsx         # Tree 演示页（汇总 5 个示例）
        └── *.jsx                # 各示例
```

## 如何添加新的组件演示页

1. **新建页面组件**：在 `src/pages` 下创建目录和文件，如 `src/pages/table/TableDemo.jsx`
2. **注册路由**：在 `src/App.jsx` 的 `<Routes>` 中添加 `<Route path="table" element={<TableDemo />} />`
3. **添加菜单项**：在 `src/layouts/BasicLayout.jsx` 的 `menuItems` 中加一项（key 与路由 path 一致）
4. **添加入口卡片（可选）**：在 `src/pages/Home.jsx` 的 `demoList` 中加一条

## 参考文档

- Ant Design 组件总览：https://ant.design/components/overview-cn
