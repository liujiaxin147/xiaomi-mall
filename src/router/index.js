/**
 * 路由封装
 */
// 导入vue和vue-router
import Vue from 'vue'
import Router from 'vue-router'
// 导入页面组件
import Home from '../pages/home'
import Index from '../pages/index'
import Product from '../pages/product'
import Detail from '../pages/detail'
import Cart from '../pages/cart'
import Order from '../pages/order'
import OrderConfirm from '../pages/OrderConfirm'
import OrderList from '../pages/OrderList'
import OrderPay from '../pages/OrderPay'
import Alipay from "../pages/alipay";
import Login from '../pages/login'
import Register from "../pages/register";
import MyOrder from "../pages/MyOrder";
import GoodsData from "../pages/GoodsData";
import GoodsType from "../pages/GoodsType";
import Address from "../pages/Address";
import AddAddress from "../pages/AddAddress";
// 加载路由插件
Vue.use(Router)
// 导出路由
export default new Router({
  mode:"hash",
  // mode:"history",
  // 路由规则
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index', // 重定向
      // 子路由
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index,
        },
        {
          path: 'product/:id', // 动态路由
          name: 'product',
          component: Product,
        },
        {
          path: '/detail',
          name: 'detail',
          component: Detail,
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 注册
    {
      path: '/register',
      component: Register,
    },
    // 购物车
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta:{
        needLogin:true
      }
    },
    //我的订单
    {
      path: '/MyOrder',
      name: '/MyOrder',
      component: MyOrder,
      meta:{
        needLogin:true
      }
    },
    //前台页面查询
    {
      path: '/GoodsData',
      name: 'GoodsData',
      component:GoodsData,
    },
    //一级分类查询
    {
      path: '/GoodsType',
      name: 'GoodsType',
      component:GoodsType,
    },
    //收货地址设置
    {
      path: '/Address',
      name: 'address',
      component:Address,
    },
    //添加收货地址
    {
      path: '/AddAddress',
      name: 'AddAddress',
      component: AddAddress,
    },
    // 订单
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: OrderList,
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: OrderConfirm,
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: Alipay,
        },
        //支付成功页面
        {
          path: '/OrderPay',
          name: 'order-pay',
          component: OrderPay,
          meta:{
            needLogin:true
          }
        }
      ],
      meta:{
        needLogin:true
      }
    },
  ]
})
