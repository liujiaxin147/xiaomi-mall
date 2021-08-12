<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <!-- 导航类目 -->
        <div class="nav-menu">
          <ul class="menu-wrap" v-for="(item,i) in goodsTopType" :key="i">
            <li class="menu-item">
              <a href="javascript:;" @click="GoodsType(item.type_id)">{{item.type_name}}</a>
              <div class="children">
                <ul v-for="(item,i) in goodsChildType" :key="i">
                  <li v-for="(item1,j) in num" :key="j">
                    <a>
                      <img :src="ImgGoods" alt="图片加载失败">
                      {{item.type_child}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
<!--            <li class="menu-item">-->
<!--              <a href="javascript:;">{{item.type_name}}</a>-->
<!--              <div class="children"></div>-->
<!--            </li>-->
<!--            <li class="menu-item">-->
<!--              <a href="javascript:;">{{item.type_name}}</a>-->
<!--              <div class="children"></div>-->
<!--            </li>-->
<!--            <li class="menu-item">-->
<!--              <a href="javascript:;">{{item.type_name}}</a>-->
<!--              <div class="children"></div>-->
<!--            </li>-->
<!--            <li class="menu-item">-->
<!--              <a href="javascript:;">出行 穿戴</a>-->
<!--              <div class="children"></div>-->
<!--            </li>-->
<!--            <li class="menu-item">-->
<!--              <a href="javascript:;">智能 路由器</a>-->
<!--              <div class="children"></div>-->
<!--            </li>-->
<!--            <li class="menu-item">-->
<!--              <a href="javascript:;">电源 配件</a>-->
<!--              <div class="children"></div>-->
<!--            </li>-->
<!--            <li class="menu-item">-->
<!--              <a href="javascript:;">生活 箱包</a>-->
<!--              <div class="children"></div>-->
<!--            </li>-->
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper class="swiper-container" :options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/#/product/'+item.id"><img v-lazy="item.img" alt=""></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告位 -->
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,i) in adsList" :key="i">
          <img v-lazy="item.img" alt="图片无法加载">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img :src="banner_img" alt="图片无法加载">
        </a>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img :src="MaxImg" alt="图片无法加载">
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(item,i) in goodsList" :key="i" @click="GoodsDetail(item.goods_id)">
              <div class="item" v-for="(item1,j) in goodsHotsale" :key="j">
                <span v-if="i%2==0" class="new-pro">热销</span>
                <span v-if="i%2!=0" class="kill-pro">秒杀</span>
                <div class="item-img">
                  <img :src="ImgSrc" alt="图片加载失败" style="width: 180px;height: 180px">
                </div>
                <div class="item-info">
                  商品名:<span style="color: red">{{item.goods_name}}</span><br>
                  原价:<span style="text-decoration: line-through;color: red">{{item.goods_oldprice}}</span><br>
                  现价:<span style="color: red">{{item.goods_price}}</span><br>
<!--                  <p class="price" @click="addCart(item2.id)">{{item2.price}}元</p>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal title="提示信息" sureText="查看购物车" btnType="3" modalType="middle" :showModal="showModal" @submit="goCart" @cancle="showModal = false">
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from '@/components/ServiceBar.vue';
import Modal from '@/components/Modal.vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'index',
  components: { ServiceBar, Modal, Swiper, SwiperSlide },
  data() {
    return {
      showModal: false,
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      goodsTopType:[],
      goodsChildType:[],
      goodsList:[],
      goodsHotsale:[],
      gooodsArrList:[],
      ImgSrc:require('@/assets/phone/16.jpg'),
      slideList: [
        {
          id: '42',
          img: require('@/assets/imgs/slider/slide-1.jpg')
        },
        {
          id: '45',
          img: require('@/assets/imgs/slider/slide-2.jpg')
        },
        {
          id: '46',
          img: require('@/assets/imgs/slider/slide-3.jpg')
        },
        {
          id: '',
          img: require('@/assets/imgs/slider/slide-4.jpg')
        },
        {
          id: '',
          img: require('@/assets/imgs/slider/slide-5.jpg'),
        }
      ],
      menuList: [
        [
          {
            id: 30,
            img: require('@/assets/imgs/item-box-1.png'),
            name: '小米CC9'
          },
          {
            id: 31,
            img: require('@/assets/imgs/item-box-2.png'),
            name: '小米8青春版'
          },
          {
            id: 32,
            img: require('@/assets/imgs/item-box-3.jpg'),
            name: 'RedMi k20pro'
          },
          {
            id: 33,
            img: require('@/assets/imgs/item-box-4.jpg'),
            name: '移动4G专区'
          }
        ],
        [
          {
            id: 30,
            img: require('@/assets/imgs/nav-img/nav-1.png'),
            name: '小米电视6'
          },
          {
            id: 31,
            img: require('@/assets/imgs/nav-img/nav-2.png'),
            name: '小米电视pro'
          },
          {
            id: 32,
            img: require('@/assets/imgs/nav-img/nav-3.png'),
            name: '小米画壁'
          },
          {
            id: 33,
            img: require('@/assets/imgs/nav-img/nav-4.png'),
            name: '小米电视plus'
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: 33,
          img: require('@/assets/imgs/ads/ads-1.png')
        },
        {
          id: 48,
          img: require('@/assets/imgs/ads/ads-2.jpg')
        },
        {
          id: 45,
          img: require('@/assets/imgs/ads/ads-3.png')
        },
        {
          id: 47,
          img: require('@/assets/imgs/ads/ads-4.jpg')
        }
      ],
      num:6,
      phoneList: [],
      ImgGoods:require('@/assets/phone/16.jpg'),
      MaxImg:require('@/assets/imgs/mix-alpha.jpg'),
      banner_img:require('@/assets/imgs/banner-1.png')
    };
  },
  mounted() {
    this.axios.post("http://42.193.121.151:8000/commonAction/goods_list",{
    }).then((response) => {
      response.data.map(item=>{
          const arr = []
          arr.push(item.goods_hotsale)
          this.goodsHotsale = arr
      }),
      this.goodsList = response.data
    },(error) => {
      console.log(error)
    });
    this.axios.post("http://42.193.121.151:8000/commonAction/Toptype",{

    }).then((response)=>{
      this.goodsTopType = response.data
    },(error)=>{
      console.log(error)
    })
    this.axios.post('http://42.193.121.151:8000/commonAction/ChildType',{

    }).then((response)=>{
      this.goodsChildType = response.data
    },(error)=>{
      console.log(error)
    });
  },
  methods: {
    GoodsDetail:function(goods_id){
      this.$router.push({path:'/detail',query:{'goods_id':goods_id}})
    },
    // 去购物车
    goCart() {
      this.$router.push('/cart');
    },
    GoodsType:function (type_id) {
      this.$router.push({name:'GoodsType',params:{type_id}})
    }
  }
};
</script>

<style lang='scss' scoped>
  .index {
    .swiper-box {
      .nav-menu {
        position: absolute;
        width: 264px;
        height: 451px;
        z-index: 9;
        padding: 26px 0;
        background: #55585a7a;
        box-sizing: border-box;
        .menu-wrap {
          .menu-item {
            height: 50px;
            line-height: 50px;
            a {
              position: relative;
              display: block;
              font-size: 16px;
              color: #fff;
              padding-left: 30px;
              &::after {
                position: absolute;
                right: 30px;
                top: 17.5px;
                content: '';
                @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
              }
            }
            &:hover {
              background-color: $colorA;
              .children {
                display: block;
              }
            }
            .children {
              display: none;
              width: 962px;
              height: 451px;
              background-color: $colorG;
              position: absolute;
              top: 0;
              left: 264px;
              border: 1px solid $colorH;
              ul {
                display: flex;
                justify-content: space-between;
                height: 75px;
                li {
                  height: 75px;
                  line-height: 75px;
                  flex: 1;
                  padding-left: 23px;
                }
                a {
                  color: $colorB;
                  font-size: 14px;
                }
                img {
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
      .swiper-container {
        height: 451px;
        .swiper-button-prev {
          left: 274px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .ads-box {
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a {
        width: 296px;
        height: 167px;
      }
    }
    .banner {
      margin-bottom: 50px;
    }
    .product-box {
      background: $colorJ;
      padding: 30px 0 50px;
      h2 {
        font-size: 22px;
        height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      }
      .wrapper {
        display: flex;
        .banner-left {
          margin-right: 16px;
          img {
            width: 224px;
            height: 619px;
          }
        }
        .list-box {
          .list {
            /*display: flex;*/
            //@include flex();
            width: 986px;
            /*margin-bottom: 14px;*/
            &:last-child {
              margin-bottom: 0;
            }
            .item {
              margin-left: 10px;
              margin-bottom: 15px;
              float: left;
              width: 236px;
              height: 302px;
              background: $colorG;
              text-align: center;
              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                line-height: 24px;
                color: $colorG;
                border-radius: 5px;
                margin-top: 5px;
                &.new-pro {
                  background: #7ecf68;
                }
                &.kill-pro {
                  background: #e82626;
                }
              }
              .item-img {
                img {
                  width: 100%;
                  height: 195px;
                }
              }
              .item-info {
                h3 {
                  font-size: 14px;
                  color: $colorB;
                  line-height: 14px;
                  font-weight: bold;
                }
                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price {
                  color: #f20a0a;
                  font-size: 14px;
                  font-weight: bold;
                  cursor: pointer;
                  &::after {
                    content: '';
                    @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                    margin-left: 5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
