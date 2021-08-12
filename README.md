[TOC]

# 1. 项目说明
1. 仿PC端小米商城，采用vue.js(2.x)+elementUI开发。
2. 主要包含页面：商城首页、商品详情页、购物车页、下单页、登录页。
2. 代码分支：master分支为：静态页面+接口交互
3. 前端框架：vue2.x。
4. UI框架：elementUI。
5. 测试用户：  
   * admin1/admin1 
   * jack/jack
6. 效果图
![首页](https://images.gitee.com/uploads/images/2021/0711/163132_25863c5d_5497830.png "index.png")

# 2. 目录说明
```
xiaomi-mall
├─ public
   ├─ json // 模拟数据
   └─ imgs // 图片资源(建议：大图片放public/imgs，小图片放src/assets)
├─ src
   ├─ api // 接口
      ├─ http.js // axios封装
      ├─ index.js // api接口统一出口
      ├─ base.js // api接口域名管理
      └─ mall.js // 商城模块api映射配置
   ├─ assets // css、iconfont、小图标
   ├─ components // 组件库
   ├─ config // 配置：环境变量
   ├─ mock // mock模拟数据
   ├─ pages // 页面
   ├─ router // 路由
   ├─ storage // 本地数据存储：sessionStorage、localStorage
   ├─ store // vuex
   └─ util // 工具js库
├─ vue.config.js // 配置文件
```

# 3. 插件依赖
```
cnpm i vue-lazyload  sass swiper vue-awesome-swiper vue-axios  vue-cookie mockjs --save-dev
cnpm install sass-loader@8.0.2 --save-dev
cnpm install qs --save-dev
cnpm install element-ui babel-plugin-component --save-dev
```

# 4. 资源说明
## 4.1 public 静态资源
1. `public/font` 字体文件
2. `public/imgs` 图片文件
   * 图片资源(建议：大图片放public/imgs，小图片放src/assets)
	* 建议图片能够放后端或者云存储的尽量就别放前端，减少包体积和优化加载速度 。
	* 图片如果是复用的图片，不属于某个页面独有的图片，直接放此目录。
	* 图片如果属于某个功能模块独有的，需要建立一个和模块名称同名的文件夹，再存于文件夹下。如：`public/img/pay` 支付模块的图片。

## 4.2 assets 静态资源
1. `assets/scss` css文件

## 4.3 store vuex 缓存
我们采用分模块来管理各个vuex子模块，便于项目的维护和整合。
1. `index.js` 此文件是入口文件，方便整合和引入vuex模块
2. `modules/user.js`  此文件是用户信息相关vuex模块

## 4.4 组件说明
1. 组件命名规范
   * 组件名称：大驼峰，如：GoodsList.vue
   * 组件文件：组件名称/组件名称.vue，一个组件对应一个文件夹，该文件夹下可以有多个类型的文件（如：js、img、css等）。如：`goodsList/GoodsList.vue`
2. 组件存放规范
   * 自定义公共复用组件存放为：`components/Com*/Com*.vue`这里存放自定义复用组件，方便大家开发和复用、共享。如果要修改，uni-ui组件，也建议复制粘贴到这里，然后自定义修改，避免去uni-ui中直接修改，因为后面uni官方组件升级后会导致之前的自定义代码丢失。
   * 自定义非公共组件存放到：`当前页/组件文件`,如：首页的广告组件，`index/childComps/IndexAdv.vue`
因为有的页面组件，自定义或者抽离的组件，也许其他页面根部就不会复用到，只是为了让主页面代码简洁和便于维护，那么这些组件，应该直接放到当前页下的`childComps`文件夹中，独立维护。
3. 组件说明规范
每个自定义组件，组件用法、参数描述应该简单、清晰，应该在组件代码的`<script>`标签内的第一行备注好：组件名称、组件描述、开发人员、组件参数等，因为时间可以淡忘一切，当然也可以让你淡忘掉之前你为什么要传这个参数。
   ```
   <script>
      /*
      * LoadMore 加载更多
      * @description 用于列表中，做滚动加载使用，展示 loading 的各种状态
      * @author JayChou
      * @property {String} status = [more|loading|noMore] loading 的状态
      * 	@value more loading 前
      * 	@value loading loading 中
      * 	@value noMore 没有更多了
      * @property {Number} iconSize 指定图标大小
      */

   </script>
   ```

# 5. 其他规范
1. 命名规范
   * 文件夹名称：小驼峰
   * js文件名称：小驼峰
   * vue文件名称：大驼峰

