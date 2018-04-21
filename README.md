# Forum
基于React的浙江大学CC98 论坛网站前端项目

## File Intro

### ./wwwroot
* /static  网站静态文件
  * /content  css文件
  * /images  网站的表情包，头图等图片文件 
  * /scripts 网站的所有脚本
  * /boardInfo.json 版面信息表
  * /98icon.ico 网站标识
  * /config.json 项目配置
  * /index.html 网站文件
  * /portrait.json 头饰配置
  
### ./Actions
react-redux的action

### ./AsyncActions
react-redux的异步action（用户中心）

### ./Components

* /Board 版面
  * /Board.tsx 版面内容
  * /BoardList.tsx 版面列表
* /Focus 关注
* /Message 私信
* /Search 搜索
* /SiteManage 全站管理
* /Topic 帖子
  * /Topic.tsx 帖子组件
  * /Topic-Award.tsx 风评/奖惩展示组件
  * /Topic-AwardInfo.tsx 单个风评/奖惩展示组件
  * /Topic-Category.tsx 导航条组件
  * /Topic-Hot-Monthly 每月热门话题
  * /Topic-Hot-Weekly 每周热门话题
  * /Topic-Judge 风评组件
  * /Topic-New 新帖
  * /Topic-PostManagement 楼层管理
  * /Topic-Replier 用户信息组件
  * /Topic-ReplierSignature 用户签名档/楼层按钮组件
  * /Topic-Reply 楼层组件
  * /Topic-ReplyContent 帖子内容
  * /Topic-SendTopic 回帖
  * /Topic-TopicInfo 主题信息
  * /Topic-TopicManagement 主题管理
  * /Topic-Trace 追踪
* /UbbEditor Ubb编辑器
* /UserCenter 用户中心
* /App.tsx 路由中心
* /Category.tsx 导航条
* /Constant.tsx 全局变量
* /DocumentTitle.tsx 网页标题
* /Edit.tsx 发表/编辑主题
* /ErrorControl.tsx 错误页面管理
* /FindIP.tsx 查询IP
* /Footer.tsx 网站底部
* /Header.tsx 网站头部
* /LogOn.tsx 登录组件
* /MainPage.tsx 网站主页
* /NoticeMessage.tsx 消息提醒
* /PageModel.tsx 翻页器模板
* /Pager.tsx 翻页器
* /RouteComponent.tsx 路由组件基类
* /SignIn.tsx 签到
* /Status.tsx 报错页面
* /UbbContainer.tsx Ubb解析器
* /UbbEditor.tsx Ubb编辑器
* /IndexedDB Indexed数据库 用户信息缓存
* /Match Redux组件
* /Props React组件的Props类
* /Reducers Redux组件
* /States React组件的State类
* /Themes 网站主题
* /Ubb Ubb解析引擎
* /Utility 函数集
* /vscodeConfig vscode开发配置
* /ActionTypes.tsx Redux的Action类型
* /Main.tsx 程序入口
* /adddna.scss zza的样式表
* /package.json 项目依赖
* /Site.scss 网站的主样式表
* /Store.tsx Redux的store组件
* /UbbEditor.scss Ubb编辑器样式表
* /UserCenter.scss 用户中心样式表
* /Utility.tsx 函数集
* /webpack.config.debug.ts debug模式使用的webpack配置
* /webpack.config.release.ts release模式使用的webpack配置
