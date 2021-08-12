<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper" style="height: 1050px">
          <Swiper :options="swiperOption">
            <Swiper-slide>
              <img :src="phone1" alt />
            </Swiper-slide>
            <Swiper-slide>
              <img :src="phone2" alt />
            </Swiper-slide>
            <Swiper-slide>
              <img :src="phone3" alt />
            </Swiper-slide>
            <Swiper-slide>
              <img :src="phone4" alt />
            </Swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
          </Swiper>
        </div>
        <div class="content">
            <h2 class="item-title">{{product.name}}</h2>
            <h1>{{GoodsData.goods_name}}</h1>
            <p class="item-info" style="font-size: 15px">
              {{GoodsData.goods_detail}}
            </p>
            <div class="delivery">小米自营</div>
            <div class="item-price">
              原价:
              <span class="del">￥{{GoodsData.goods_oldprice}}</span>
            </div><br>
            <div class="item-price">
              现价:
              <span>￥{{GoodsData.goods_price}}</span>
            </div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version clearfix">
            <h2>选择版本</h2>
            <div class="phone fl" :class="{'checked':version==1}" @click="version=1">6GB+64GB 全网通</div>
            <div class="phone fr" :class="{'checked':version==2}" @click="version=2">4GB+64GB 移动4G</div>
          </div>
          <div class="item-color">
            <h2>选择颜色</h2>
            <div class="phone checked">
              <span class="color"></span>
              深空灰
            </div><br><br>
            <h2>选择数量</h2><br>
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl" style="color: red;font-size: 15px">数量</div>
              <div class="fr" style="color: red;font-size: 15px">{{num}}</div>
            </div>
            <div class="phone-total">总计:￥{{GoodsData.goods_price*num}}</div>
          </div>
          <div class="btn-group">
            <div style="width: 280px; height: 54px;float: left">
              <a href="javascript:;" class="btn btn-huge" @click="BuyGoods">立即购买</a>
            </div>
            <div style="width: 280px;height: 54px;float: right">
              <a href="javascript:;" class="btn btn-huge fl" v-on:click="addCart">加入购物车</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img :src="item_price" alt />
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import ProductParam from './../components/ProductParam';
  import ServiceBar from './../components/ServiceBar';
  export default {
    name: 'detail',
    data() {
      return {
        num:1,
        id: this.$route.params.id,
        version: 1,
        product: '',
        swiperOption: {
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        GoodsData:[],
        item_price:require('@/assets/imgs/detail/item-price.jpeg'),
        phone1:require('@/assets/imgs/detail/phone-1.jpg'),
        phone2:require('@/assets/imgs/detail/phone-2.jpg'),
        phone3:require('@/assets/imgs/detail/phone-3.jpg'),
        phone4:require('@/assets/imgs/detail/phone-4.jpg'),
      };
    },
    components: {
      Swiper,
      SwiperSlide,
      ProductParam,
      ServiceBar,
    },
    created() {
      this.axios.post("http://42.193.121.151:8000/commonAction/Goods_detail",{
        'goods_id':this.$route.query.goods_id
      }).then((response)=>{
        this.GoodsData = response.data[0]
      },(error)=>{
        console.log(error)
      })
    },
    methods: {
      addCart:function () {
        let token = localStorage.getItem("token");
        if (token===null||token===""){
          this.$router.push({path:'/login'}).catch(()=>{});
        }else{
          this.axios.post("http://42.193.121.151:8000/shop/addCard",{
            "cart_goods_id":this.GoodsData.goods_id,
            "cart_goods":this.GoodsData.goods_name,
            "cart_money":this.GoodsData.goods_price,
            "cart_summoney":this.GoodsData.goods_price*this.num,
            "cart_count":this.num
          }).then((response)=>{
            if (response.data === 1){
              this.$message({
                showClose:true,
                center:true,
                message:'添加成功',
                type:"success"
              })
              this.$router.push({path:'/cart'}).catch(()=>{});
            }
          },(error)=>{
            console.log(error)
          });
        }
      },
      BuyGoods:function () {
        let token = localStorage.getItem("token");
        if (token===""||token===null){
          this.$router.push({path:'/login'})
        }else{
          this.axios.post("http://42.193.121.151:8000/shop/BuyGoods",{
            "goods_id":this.GoodsData.goods_id,
            "goods_name":this.GoodsData.goods_name,
            "goods_price":this.GoodsData.goods_price,
            "goods_sumprice":this.GoodsData.goods_price*this.num,
            "goods_count":this.num,
            "goods_detail":this.GoodsData.goods_detail,
          }).then((response)=>{
            if (response.data===1){
              this.$router.push({path:'/order',query:{"goods_id":this.GoodsData.goods_id}})
            }else{
              this.$message({
                message:'购买失败',
                type:"success",
                center:true,
                showClose:true,
              })
            }
          },(error)=>{
            console.log(error)
          })
        }
      },
    }
  };
</script>
<style lang="scss">
.detail {
  .wrapper {
    .swiper {
      float: left;
      width: 642px;
      height: 617px;
      margin-top: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      float: right;
      width: 584px;
      height: 870px;
      .item-title {
        font-size: 28px;
        padding-top: 30px;
        padding-bottom: 16px;
        height: 26px;
      }
      .item-info {
        font-size: 14px;
        height: 36px;
      }
      .delivery {
        font-size: 16px;
        color: #ff6700;
        margin-top: 26px;
        margin-bottom: 14px;
        height: 15px;
      }
      .item-price {
        font-size: 20px;
        color: #ff6700;
        height: 19px;
        .del {
          font-size: 16px;
          color: #999999;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .line {
        height: 0;
        margin-top: 25px;
        margin-bottom: 28px;
        border-top: 1px solid #e5e5e5;
      }
      .item-addr {
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        padding-top: 31px;
        padding-left: 64px;
        font-size: 14px;
        line-height: 14px;
        position: relative;
        .icon-loc {
          position: absolute;
          top: 27px;
          left: 34px;
          @include bgImg(20px, 20px, '/imgs/detail/icon-loc.png');
        }
        .addr {
          color: #666666;
        }
        .stock {
          margin-top: 15px;
          color: #ff6700;
        }
      }
      .item-version,
      .item-color {
        margin-top: 30px;
        h2 {
          font-size: 18px;
          margin-bottom: 20px;
        }
      }
      .item-version,
      .item-color {
        .phone {
          width: 287px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #333333;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          span {
            color: #666666;
            margin-left: 15px;
          }
          .color {
            display: inline-block;
            width: 14px;
            height: 14px;
            background-color: #666666;
          }
          &.checked {
            border: 1px solid #ff6600;
            color: #ff6600;
          }
        }
      }
      .item-total {
        height: 108px;
        background: #fafafa;
        padding: 24px 33px 29px 30px;
        font-size: 14px;
        margin-top: 50px;
        margin-bottom: 30px;
        box-sizing: border-box;
        .phone-total {
          font-size: 24px;
          color: #ff6600;
          margin-top: 18px;
        }
      }
    }
  }
  .price-info {
    background-color: #f3f3f3;
    height: 340px;
    h2 {
      font-size: 24px;
      color: #333333;
      padding-top: 38px;
      margin-bottom: 30px;
    }
  }
}
</style>
