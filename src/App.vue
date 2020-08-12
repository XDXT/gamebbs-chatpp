<template>
  <div id="app">
    <div class="bg" v-if="!isVScreen">
      <!-- big circle 大圆圈 start -->
      <div class="left-circle"></div>
      <div class="right-circle">
        <div class="pink-cicle"></div>
      </div>
      <!-- big circle 大圆圈 end -->
      <!-- Bubble 气泡 start -->
      <div class="white-circle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!-- Bubble 气泡 end -->
    </div>

    <div class="bg-tip" v-if="isVScreen">尚未做竖屏用路由</div>

    <transition
      mode="out-in" 
      enter-active-class="animate__animated animate__fadeInUp animate__fast"
      leave-active-class="animate__animated animate__fadeOutUp animate__fast">
    >
      <router-view v-if="!isVScreen"/>
    </transition>
  </div>
</template>

<script>
import 'animate.css' // 导入全局引用的css

export default {
  beforeMount() {
    var html = document.querySelector('html');
    var userAgent = navigator.userAgent;
    var self = this;
    window.onload = function () {
      self.responsiveScreen(html, userAgent);
    }

    window.onresize = function(){
      self.responsiveScreen(html, userAgent);
    }
  },
  data() {
    return {
      isVScreen: false
    }
  },
  methods: {
    responsiveScreen: function (html, userAgent) {
      html.className = "";
      if(userAgent.indexOf("iPhone")!=-1){
        html.classList.add("iphone")
      }else if(userAgent.indexOf("Android")!=-1){
        html.classList.add("android")
      }else if(userAgent.indexOf("iPad")!=-1){
        html.classList.add("ipad")
      }else{
        html.classList.add("pc")
      }
      
      let screenSize = 160;
      if(window.innerWidth >= window.innerHeight){
        screenSize = window.innerHeight;
        this.isVScreen = false;
        html.classList.add("screen-landscape")
      }else {
        screenSize = window.innerWidth;
        html.classList.add('screen-vertical');
        this.isVScreen = true;
      }
      
      let fontSize = screenSize / 10;
      html.style.fontSize = fontSize + 'px';
    }
  },
}
</script>

<style lang="less">
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  position: relative;
  background: #f4f3f9;
}

.circle(@color: #c6eff9, @size: 33vh) {
  border-radius: 50%;
  background: @color;
  width: @size;
  height: @size;
  position: absolute;
  z-index: -1;
}

/** 横屏的背景样式 **/
.screen-landscape #app {
  .bg-tip {
    display: none;
  }
  /* 背景圆圈 */
  .bg {
    /* 背景蓝红圆圈 */
    .left-circle {
      .circle(#c6eff9, 90vh);
      top: 0;
      left: 0;
      transform: translate(-47%, -30%);
      box-shadow: 1px 1px 10px #ebeaf0;
    }
    .right-circle {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 70vh;
      height: 60vh;
      overflow: hidden;
      .pink-cicle {
        .circle(#f1dbe5, 75vh);
        transform: translate(30%, 5%);
        box-shadow: 1px 1px 10px #ebeaf0;
      }
    }

    /* 背景气泡 */
    .white-circle {
      div {
        box-shadow: 1px 1px 10px #ebeaf0;
      }

      div:nth-child(1) {
        .circle(#ffffff, 2vh);
        top: 5%;
        left: 20%;
      }

      div:nth-child(2) {
        .circle(#ffffff, 5vh);
        top: 2%;
        left: 43%;
      }

      div:nth-child(3) {
        .circle(#ffffff, 3vh);
        bottom: 5%;
        right: 40%;
      }

      div:nth-child(4) {
        .circle(#ffffff, 3.5vh);
        bottom: 45%;
        right: 2%;
      }

      div:nth-child(5) {
        .circle(#ffffff, 2vh);
        bottom: 5%;
        left: 8%;
      }
    }
  }
}

.bg-tip {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 1000;
  text-align: center;
  line-height: 100vh;
  font-size: 0.5rem;
}


</style>
