<template>
    <div>
        <NavHeader></NavHeader>
  <div class="cart">
    <order-header title="我的购物车">
      <template #tips>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper" style="height: 930px">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head" style="padding-left: 70px;text-align: center">
<!--            <li class="col-1"><span class="checkbox"></span>全选</li>-->
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list" v-for="item in list" :key="item.goods_id">
            <li class="cart-item">
<!--              <div class="item-check">-->
<!--                <span class="checkbox"></span>-->
<!--              </div>-->
              <div class="item-name">
                <img :src="ImgSrc" alt="图片无法加载">
                <span>{{item.cart_goods}}</span>
              </div>
              <div class="item-price" style="text-align: center">{{item.cart_money}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;">-</a>
                  <span>{{item.cart_count}}</span>
                  <a href="javascript:;">+</a>
                </div>
              </div>
              <div class="item-tal" style="margin-right: 36px">￥{{item.cart_summoney}}</div>
                  <el-popconfirm  @confirm="RemoveCartGoods(item.cart_id,i)"
                                  confirm-button-text='确认'
                                  cancel-button-text='取消'
                                  icon="el-icon-info"
                                  icon-color="red"
                                  title="确定要删除商品吗?"
                  >
                      <el-button type="danger" slot="reference" style="padding: 12px 40px">删除商品</el-button>
                  </el-popconfirm>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/index" style="color: red">继续购物</a>
            共<span>{{list.length}}</span>件商品
          </div>
          <div class="total fr">
            合计：<span>{{sumPrice}}</span>元
            <a href="javascript:;" class="btn">去结算</a>
          </div>
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
    this.axios.post('http://42.193.121.151:8000/shop/CartData',{

    }).then((response)=>{
      this.list = response.data
        console.log(this.list)
    },(error)=>{
      console.log(error)
    })
  },
  computed:{
    sumPrice(){
      let sumPrice = 0
      //遍历list,拿到单价和数量
      for (let i in this.list){
        //总价为每个商品的价格(price)*数量(num)
        sumPrice+=(this.list[i].cart_money*this.list[i].cart_count)
      }
      return sumPrice;
    }
  },
  methods:{
      RemoveCartGoods:function (cart_id,i) {
          this.axios.post("http://42.193.121.151:8000/shop/RemoveCartGoods",{
              "cart_id":cart_id
          }).then((response)=>{
              if (response.data === 1){
                  this.$message({
                      type:"success",
                      message:'删除商品成功',
                      center:true
                  })
                  this.list.splice(i,1)
              }else{
                  this.$message({
                      type:"error",
                      message:'删除失败',
                      center:true
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
