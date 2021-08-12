<template>
    <div>
        <NavHeader></NavHeader>
  <div class="cart">
    <order-header title="我的订单">
    </order-header>
    <div class="wrapper" style="height: 930px">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
<!--            <li class="col-1"><span class="checkbox"></span>全选</li>-->
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-1">总价</li>
            <li class="col-1">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">状态</li>
          </ul>
          <ul class="cart-item-list" v-for="(item,i) in list" :key="i">
            <li class="cart-item">
<!--              <div class="item-check">-->
<!--                <span class="checkbox"></span>-->
<!--              </div>-->
              <div class="item-name">
                <img :src="ImgSrc" alt="图片无法加载">
                <span>{{item.pay_goods_name}}</span>
              </div>
              <div class="item-price">{{item.pay_money}}</div>
              <div class="item-price">{{item.pay_summoney}}</div>
              <div class="item-num">
<!--                <div class="num-box">-->
<!--                  <a href="javascript:;">-</a>-->
                  <span>{{item.pay_goods_count}}</span>
<!--                  <a href="javascript:;">+</a>-->
<!--                </div>-->
              </div>
              <div class="item-tal" style="margin-right: 70px">￥{{item.pay_summoney}}</div>
                <el-popconfirm  @confirm="RemoveOrder(item.pay_id,item.pay_state,i)"
                               confirm-button-text='确认'
                               cancel-button-text='取消'
                               icon="el-icon-info"
                               icon-color="red"
                               title="确定要取消订单吗?"
                >
                    <el-button type="danger" v-if="item.pay_state===0" slot="reference" style="padding: 12px 40px">取消订单</el-button>
                    <el-button type="warning" v-else-if="item.pay_state===1" slot="reference" style="padding: 12px 40px">退货处理</el-button>
                    <p v-else-if="item.pay_state===3" slot="reference" style="padding: 12px 40px;color: red">同意退款</p>
                    <p v-else="item.pay_state===2" slot="reference" style="padding: 12px 40px;color: red;">退款中</p>
                </el-popconfirm>
            </li>
              <div class="detail" style="width: 1226px;height: 50px;">
                  <div class="detail_left" style="float:left;width: 800px;height: 50px;text-align: left">
                      <p style="color:black;line-height: 50px;font-size: 15px">下单时间: {{item.pay_time}}</p>
                  </div>
                  <div class="detail_right" style="float:right;width: 426px;height: 50px;text-align: left">
                      <p style="float: right;color:black;line-height: 50px;font-size: 15px" v-if="item.pay_state===0">48小时之内发货,请耐心等待</p>
                      <p style="float: right;color:black;line-height: 50px;font-size: 15px" v-else-if="item.pay_state===2">已发起退款,等待商家同意</p>
                      <p style="float: right;color:red;line-height: 50px;font-size: 15px" v-else-if="item.pay_state===1">已发货,请耐心等待,快递很快会发到您的身边</p>
                      <p style="float: right;color:blue;line-height: 50px;font-size: 15px" v-else="item.pay_state===3">卖家已同意退款,退款成功</p>
                  </div>
              </div>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/index" style="color: red">继续购物</a>
            共<span>{{list.length}}</span>件商品
          </div>
<!--          <div class="total fr">-->
<!--            合计：<span>{{sumPrice}}</span>元-->
<!--            <a href="javascript:;" class="btn" @click="pay">立即支付</a>-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
    </div>
</template>
<script>
import OrderHeader from '@/components/OrderHeader';
import ServiceBar from '@/components/ServiceBar';
import NavFooter from '@/components/NavFooter';
import NavHeader from "../components/NavHeader";
export default {
  name: 'cart',
  components: {
    NavHeader,
    OrderHeader,
    ServiceBar,
    NavFooter,
  },
  data() {
    return {
      list: [], //商品列表
      allChecked: false, //是否全选
      cartTotalPrice: 0, //商品总金额
      checkedNum: 0, //选中商品数量
      ImgSrc:require('@/assets/phone/16.jpg')
    };
  },
  mounted() {
    this.axios.post('http://42.193.121.151:8000/shop/OrderPayData',{
    }).then((response)=>{
      this.list = response.data
    },(error)=>{
      console.log(error)
    })
  },
    methods: {
      pay:function () {
          this.axios.post("http://42.193.121.151:8000/shop/pay",{
              "pay_goods_id":this.$route.query.goods_id,
              "pay_money":this.list[0].order_money,
              "pay_summoney":this.list[0].order_money*this.list[0].order_count,
              "pay_goods_count":this.list[0].order_count,
              "pay_goods_name":this.list[0].order_name,
          }).then((response)=>{
              if (response.data === 1){
                  this.$router.push("/order/pay")
              }else{
                  this.$message({
                      message:"支付失败",
                      type:"success",
                      center:true,
                  })
              }
          },(error)=>{
              console.log(error)
          })
      },
      RemoveOrder:function (pay_id,pay_state,i) {
          this.axios.post("http://42.193.121.151:8000/shop/RemoveOrder",{
              "pay_id":pay_id,
              "pay_state":pay_state,
          }).then((response)=>{
              console.log(response.data)
              if (response.data === 1){
                  location.reload()
                  this.$message({
                      type:"success",
                      message:'取消订单成功'
                  })
              }
          },(error)=>{
              console.log(error)
          })
      }
  }
};
</script>
<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
              text-align: right;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
