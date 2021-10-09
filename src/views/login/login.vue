<template>
  <div class="login">
    <div class="login-outside">
      <div class="blur-window">
        <div class="half">
          <div class="top-left">
            <img src="~@/assets/img/logo.png" alt="" />
            <div>
              <h1>国电煤炭</h1>
              <h3>CHINA TRADEMARK</h3>
            </div>
          </div>
          <div class="bottom-right">
            <h2 style="display: flex; flex-direction: row-reverse">交易平台</h2>
            <h4>Guodian Coal Trading Platform</h4>
          </div>
        </div>
        <login-panel class="login-panel"></login-panel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './cpn/login-panel.vue'
export default defineComponent({
  name: 'login',
  setup() {
    return {}
  },
  components: {
    loginPanel
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #a9b2c3, #c1c5d0);
  .login-outside {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('~@/assets/img/background1.jpg') 1650px 800px;
    .blur-window {
      width: 70%;
      height: 26rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.2);
      .half {
        position: relative;
        flex: 1;
        height: 100%;
        color: white;
        .top-left {
          position: absolute;
          display: flex;
          top: 2rem;
          left: 1rem;
          img {
            width: 3.8rem;
            height: 3.8rem;
          }
        }
        .bottom-right {
          position: absolute;
          bottom: 2em;
          right: 1rem;
        }
      }
      .login-panel {
        flex: 1;
      }
      @media screen and (max-width: 768px) {
        .login-panel {
          margin: 0 auto;
          background: rgba(255, 255, 255, 0);
        }
        .half {
          display: none;
        }
      }
    }
  }
}
</style>
