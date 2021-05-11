# 技术点：

1. react-route-config集中管理路由
2. flex 布局
3. react-route
4. antd+样式按需引入
5. 路由导航守卫（路由鉴权）
6. 编程式导航 history push replace
7. 响应式布局，判断屏幕大小
8. withRouter 加工一般组件，返回新组件，使其具有路由组件的API
9. componentDidMount
10. input 监听回车事件
11. 正则表达式验证
12. CSS 自定义动画
13. 手写导航栏效果
14. 页脚始终固定在底部（min-height、负margin-top、专门填充的div）
15. 渲染数据`<li></li>`之前，先`setState`存放数据，一定要初始化状态！！！`state = { going: [] };`
16. onClick传递参数：`this.deleteTask.bind(this, taskObj._id)`，`bind(this,参数)`
17. 增删改查：先删除state里的，快速渲染好页面。再改数据库中的。
18. 根据不同状态渲染不同组件
19. 解决闪动问题：isLoading，使用加载页面
20. 获取当前时间`import moment from 'moment';`
21. 开启定时器每秒更新状态（componentDidMount），开启之前先执行一遍需要的操作，记得关闭定时器（componentWillUnmount）
22. input上传图片、预览图片
23. input file元素的美化方案：外面套层div，input隐藏，点击div触发input的click事件

# 主要功能实现：

## 1. 注册

## 2. 登录

## 3. 退出



默认头像

![](https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20210510203904.png)