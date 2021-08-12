<template>
    <div>
        <NavHeader></NavHeader>
  <div class="cart">
    <order-header title="订单支付">
      <template #tips>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快支付</span>
      </template>
    </order-header>
    <div class="wrapper" style="height: 930px">
      <div class="container">
          <span style="font-size: 15px;color: red">请选择收货地址:</span>&nbsp;
          <el-select v-model="AddressList.address_name" placeholder="请选择" @change="AddressChange">
              <el-option v-for="item in AddressList" :label="item.address_name" :value="item.address_id">
              </el-option>
          </el-select>&nbsp;
          <el-select v-model="AddressChildList.address_name" placeholder="请选择" @change="AddressChildChange">
              <el-option v-for="item in AddressChildList" :label="item.address_name" :value="item.address_id">
              </el-option>
          </el-select>&nbsp;
          <el-select v-model="AddressChildLastList.address_name" placeholder="请选择">
              <el-option v-for="item in AddressChildLastList" :label="item.address_name" :value="item.address_id">
              </el-option>
          </el-select><br><br>
          <el-button type="primary" @click="DataAddress">选择收货地址</el-button>&nbsp;
          <span style="color: red;font-size: 15px">{{AddressData.user_name}}</span>&nbsp;
          <span style="font-size: 15px">{{AddressData.user_tel}}</span>&nbsp;
          <span style="font-size: 15px">{{AddressData.address_detail}}</span>
          <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
              <el-table :data="gridData" ref="multipleTable" @select="handleSelection" @selection-change="handleSelectionChange" @row-click="handleRowClick">
                  <el-table-column type="selection" width="80"></el-table-column>
                  <el-table-column property="user_name" label="收件人" width="150"></el-table-column>
                  <el-table-column property="address_detail" label="详细地址" width="200"></el-table-column>
                  <el-table-column property="user_tel" label="电话"></el-table-column>
                  <el-table-column :render-header="renderHeader"></el-table-column>
              </el-table>
          </el-dialog>
        <div class="cart-box">
          <ul class="cart-item-head">
<!--            <li class="col-1"><span class="checkbox"></span>全选</li>-->
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-1">总价</li>
            <li class="col-1">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list" v-for="(item,i) in list" :key="i">
            <li class="cart-item">
<!--              <div class="item-check">-->
<!--                <span class="checkbox"></span>-->
<!--              </div>-->
              <div class="item-name">
                <img :src="ImgSrc" alt="图片无法加载">
                <span>{{item.order_name}}</span>
              </div>
              <div class="item-price">{{item.order_money}}</div>
              <div class="item-price">{{item.order_sumorder}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;">-</a>
                  <span>{{item.order_count}}</span>
                  <a href="javascript:;">+</a>
                </div>
              </div>
              <div class="item-tal" style="margin-right: 70px">￥{{item.order_sumorder}}</div>
<!--              <div class="item-del"></div>-->
                <el-popconfirm @confirm="RemoveOrder(list[0].order_id,i)"
                        confirm-button-text='确认'
                        cancel-button-text='取消'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定要取消订单吗?"
                >
                    <el-button type="danger" slot="reference" style="padding: 12px 40px">取消订单</el-button>
                </el-popconfirm>
            </li>
              <div class="detail" style="width: 1226px;height: 50px;">
                  <div class="detail_left" style="float:left;width: 800px;height: 50px;text-align: left">
                      <span style="font-size: 15px">商品简介:</span><span style="line-height: 50px;font-size: 15px">{{item.order_detail}}</span>
                  </div>
                  <div class="detail_right" style="float:right;width: 426px;height: 50px;background-color: aqua;text-align: left"></div>
              </div>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/index" style="color:red;">继续购物</a>
            共<span>{{list.length}}</span>件商品
          </div>
          <div class="total fr">
            合计：<span>{{sumPrice}}</span>元
            <a href="javascript:;" class="btn" @click="pay">立即支付</a>
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
import NavHeader from "../components/NavHeader";
import OrderHeader from '@/components/OrderHeader';
import ServiceBar from '@/components/ServiceBar';
import NavFooter from '@/components/NavFooter';
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
      gridData: [],
      dialogTableVisible: false,
      list: [], //商品列表
      AddressList:[],  //存放收货地址一级下拉框数据
      AddressChildList:[], //存放收货地址二级下拉框数据
      AddressChildLastList:[], //存放收货地址三级下拉框数据
      multipleSelection:[], //存放Table选中的数据
      AddressData:[], //存放地址数据
      allChecked: false, //是否全选
      cartTotalPrice: 0, //商品总金额
      checkedNum: 0, //选中商品数量
      ImgSrc:require('@/assets/phone/16.jpg')
    };
  },
    created() {
      this.axios.post('/shop/OrderAddress',{
      }).then((response)=>{
          this.AddressList = response.data
      },(error)=>{
          console.log(error)
      })
    },
    mounted() {
        this.axios.post('/shop/OrderData',{
            "goods_id":this.$route.query.goods_id
        }).then((response)=>{
          this.list = response.data
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
        sumPrice+=(this.list[i].order_money*this.list[i].order_count)
      }
      return sumPrice;
    }
  },
  methods: {
      pay:function () {
          if (this.AddressData.length===0){
              this.$message({
                  type:"success",
                  message:'请选择收货地址'
              })
          }else{
              this.axios.post("http://42.193.121.151:8000/shop/pay",{
                  "pay_top_address":this.AddressList.address_name,
                  "pay_child_address":this.AddressChildList.address_name,
                  "pay_last_address":this.AddressChildLastList.address_name,
                  "pay_user_name":this.AddressData.user_name,
                  "pay_user_tel":this.AddressData.user_tel,
                  "pay_address_detail":this.AddressData.address_detail,
                  "pay_goods_id":this.$route.query.goods_id,
                  "pay_money":this.list[0].order_money,
                  "pay_summoney":this.list[0].order_money*this.list[0].order_count,
                  "pay_goods_count":this.list[0].order_count,
                  "pay_goods_name":this.list[0].order_name,
              }).then((response)=>{
                  if (response.data === 1){
                      this.$router.push("/order/OrderPay")
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
          }
      },
      AddressChange:function (value) {
          this.axios.post("http://42.193.121.151:8000/shop/AddressChild",{
              "address_child":value
          }).then((response)=>{
              this.AddressChildList = response.data
          },(error)=>{
              console.log(error)
          })
      },
      AddressChildChange:function(value){
          this.axios.post("http://42.193.121.151:8000/shop/AddressChildLast",{
              "address_childLast":value
          }).then((response)=>{
              this.AddressChildLastList = response.data
          },(error)=>{
              console.log(error)
          })
      },
      DataAddress:function () {
          this.dialogTableVisible = true
          this.axios.post("http://42.193.121.151:8000/shop/DataAddress",{
          }).then((response)=>{
              this.gridData = response.data
          },(error)=>{
              console.log(error)
          })
      },
      handleSelectionChange:function (row) {
          if (row.length>1){
              this.$refs.multipleTable.clearSelection()
              this.$refs.multipleTable.toggleRowSelection(row.pop())
          }else{
              this.multipleSelection = row
          }
      },
      handleRowClick:function (row,column,event) {
          this.$refs.multipleTable.toggleRowSelection(row)
      },
      handleSelection:function (selection,row) {
          // console.log(row)
      },
      renderHeader:function () {
          return(
              <div>
              <el-button type="primary" onclick={this.confirmAddress}>确认</el-button>
              </div>
          )
      },
      confirmAddress:function () {
          if (this.multipleSelection.length===0){
              this.$message({
                  type:"success",
                  message:'请选择收货地址',
                  center:true
              })
          }else{
              this.AddressData = this.multipleSelection[0]
              this.dialogTableVisible = false
          }
      },
      RemoveOrder:function (order_id,i) {
          this.axios.post("http://42.193.121.151:8000/shop/DeleteOrder",{
              "order_id":order_id
          }).then((response)=>{
              if (response.data === 1){
                  this.$message({
                      type:"success",
                      message:'取消订单成功',
                      center:true
                  })
                  this.list.splice(i,1)
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
          background: url('../assets/imgs/icon-gou.png') #ff6600 no-repeat center;
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
            background: url('../assets/imgs/icon-close.png') no-repeat center;
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
