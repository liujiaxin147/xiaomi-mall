<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img :src="LoginImg" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <router-link to="/register">
              <div class="sms" @click="register">立即注册</div>
            </router-link>
            <div class="reg">
              手机短信登录/注册
              <span>|</span>忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <nav-footer />
    </div>
  </div>
</template>
<script>
import NavFooter from '@/components/NavFooter.vue';
import {mapActions} from "vuex";
export default {
  name: 'login',
  components: { NavFooter },
  data() {
    return {
      username: '',
      password: '',
      userId: '',
      LoginImg:require('@/assets/imgs/login-logo.png')
    };
  },
  methods: {
    ...mapActions(['saveUserName']),
    login() {
      this.axios.post("http://42.193.121.151:8000/commonAction/login",{
        "user_name":this.username,
        "user_pass":this.password,
      }).then((response)=>{
        if (response.data===false){
          this.$message({
            showClose:true,
            message:'用户名或密码不正确!',
            center:true,
            type:"error"
          })
        }else{
          this.$message({
            showClose:true,
            message:'登录成功',
            center:true,
            type:"success"
          })
          localStorage.setItem("token",this.username)
          this.$router.push({name:"index",params:{"user_name":this.username}})
        }
      },(error)=>{
        console.log(error);
      })
    },
    register() {
      this.$api.mall.register({
          username: 'admin1',
          password: 'admin1',
          email: 'admin1@qq.com'
        })
        .then(() => {
          this.$message.success('恭喜您，注册成功！');
        })
    }
  }
};
</script>
<style lang="scss">
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url('../assets/imgs/login-bg.jpg') no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 13px;
        right: 0px;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
        .btn-box {
          border-radius: 5px;
          line-height: 60px;
          text-align: center;
          background-color: $colorA;
          a {
            color: #fff;
          }
        }
      }
    }
  }
  .footer {
    background: #fff;
  }
}
</style>
