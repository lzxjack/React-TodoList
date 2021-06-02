# 1. 前言

最近写了一款基于`React`脚手架开发的 TodoList 网页应用，主要记录自己的代办事务，方便查看、管理、安排时间，提升效率。

PC Web 端 + 移动端 + 黑暗模式，可日常使用。

没有复杂的界面，没有繁琐的设置，开箱即用，专注于任务管理。

**应用网址**：<a href="https://lzxtodo.top" target="_blank">TodoList</a>

**源码仓库**：<a href="https://github.com/lzxjack/React-TodoList" target="_blank">[GitHub]</a>

![](https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20210602113432.png)

![](https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20210602113848.png)

# 2. 应用简介

## 1. 主要功能

-   邮箱注册、登录
-   注册邮箱地址、密码的验证
-   邮箱登录后，可绑定用户名，选择使用用户名登录同一账号
-   退出功能
-   页脚显示一句诗词（<a href="https://www.jinrishici.com/" target="_blank">今日诗词</a>）
-   实时时间显示
-   黑暗模式、白天模式切换，下次登录自动切换上次应用的模式
-   用户累计完成的任务计数
-   上传用户头像、显示头像
-   修改用户昵称、显示昵称
-   根据时间段显示不同的欢迎语句
-   添加、修改近期任务、长期任务
-   完成任务
-   删除任务
-   近期任务转为长期任务
-   长期任务转为近期任务
-   清空所有已完成任务
-   按钮提示功能
-   适配移动端
-   移动端可将网页添加到主屏幕，实现类似 App 效果

## 2. 主要用到的技术

### 前端

-   `React`脚手架`Create-React-App`
-   状态集中管理工具`Redux`
-   前端路由`React-Router`、集中式路由管理`react_router_config`、路由鉴权
-   少量使用`AntD`组件库 （`Icon`图标、`Tooltip`文字提示、`Notification`通知提醒框、`Message`全局提示）
-   `LocalStorage`客户端存储

### 后端

后端使用腾讯云`CloudBase`云端一体化后端云服务，包括：

-   用户管理：注册、登录
-   数据库：存放用户任务数据
-   云存储：存放用户上传的头像
-   网站托管

# 3. 主要功能实现

## 1. 登录前后的路由鉴权

未登录的用户只能访问到登录/注册页面，已登录的用户自动跳转到任务管理页面。用户的登录信息保存在客户端`LocalStorage`，整个应用初始化时，首先判断用户是否登录，将是否登录的信息保存在`redux`中。应用根据`redux`中的状态渲染`登录/注册组件`or`任务管理组件`，其中`任务管理组件`必须已登录才会渲染。

登录时，调用`CloudBase`的用户管理接口；退出时，清空`LocalStorage`中的数据即可。用户成功登录、退出，分别更新`redux`状态。

## 2. 任务列表展示

用户成功登录时，向数据库发起请求，获取用户的所有任务，保存在`redux`中。各个组件根据`redux`中任务的不同属性、分别渲染`近期任务`、`长期任务`、`已完成任务`即可。

## 3. 任务添加、编辑、删除

添加新任务时，获取到用户输入的内容。向服务器发起请求，添加新任务，返回的数据中拿到数据的`ID`，将输入的内容、`ID`组成一条数据，添加到`redux`状态中，状态变化，驱动页面更新。

编辑、删除任务时，只要获取到用户编辑数据的`ID`，先在`redux`中完成修改，可以较快地更新页面，提升用户体验。再向服务器发起请求，执行同样的操作。

完成任务实际上也是编辑任务，只是修改了任务对象的属性值。

## 4. 累计完成任务计数、黑暗模式数据

用户登录成功时，向数据库发送请求，查找是否有存放用户数据的文档。若无，则代表是第一次登录，则创建一条新文档，用于存放用户的累计任务完成数、是否黑暗模式数据，同时初始化`redux`；若有，则不是第一次登陆，读取数据库中的累计任务完成数、是否黑暗模式数据，放入`redux`中。页面根据`redux`中的数据，显示用户的累计任务完成数，并展示黑暗模式或白天模式。

## 5. 上传、修改头像

使用`<input />`标签选择文件，触发`onChange`后，验证选择的文件类型、大小等数据，满足一定条件后，才能将图片上传到`CloudBase`的云存储，返回图片的链接，放入`redux`，页面根据链接展示头像，实现预览功能。用户满意后，再点击`上传`按钮，发送网络请求，将头像链接保存在`CloudBase`的用户信息中。

每次成功登录后，都会发送网络请求，获得用户的头像链接，保存在`redux`，页面根据链接展示用户头像。

# 4. 未来计划

由于本人能力有限，应用还有很多可以再完善的地方，将来可能实现的计划（功能）：

1. 使用`electron`技术，将应用做成PC客户端

2. 利用`React Native`，将应用做成移动端应用

3. 开发微信小程序端

4. 添加自定义分类功能

5. 添加自定义更换背景图片

   ...