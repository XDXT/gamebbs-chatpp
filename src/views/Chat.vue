<template>
  <div id="chat">
    <div class="chat-board">
      <!-- slide-bar 侧边导航栏 start -->
      <slide-bar activeName="chat"></slide-bar>
      <!-- slide-bar 侧边导航栏 end -->
      <!-- content 内容主体 start -->
      <div class="chat-info">
        <div class="chat-content" v-if="status!='chat'">
          <div class="chat-circle">
            <div class="chat-rect"></div>
            <div class="chat-rect"></div>
            <div class="chat-rect"></div>
            <div class="time-day" @click="joinChat"> 
              <span>{{status}}</span>
            </div>
          </div>
        </div>
        
        <router-view/>
      </div>
      <!-- content 内容主体 end -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SlideBar from '@/components/SideBar'

export default {
  name: 'Chat',
  components: {
    SlideBar
  },
  data() {
    return {
      status: 'Join',
      connectCount: 0,
    }
  },
  async mounted() {
    if (this.$store.state.me == null) {
      let res = await axios.get(this.$root.api.UserInfo);
      this.$store.commit('setMe', res.data.user);
    }
  },
  methods: {
    joinChat: async function () {
      if (this.connectCount == 0) {
        this.status ='connect...';
      } else {
        this.status ='reconnect...';
      }
      if (this.connectCount < 9) {
        this.connectCount++;
        let result = await this.$store.dispatch('connectSocket');
        if (result === true) {
          this.status = 'chat';
          if (this.$route.path !== '/chat/chatapp') {
            this.$router.push({
                path: '/chat/chatapp'
            });
          }
          this.connectCount = 0;
        } else {
          setTimeout(() => {
            this.joinChat()
          }, 600);
        }
      } else {
        this.status ='failed';
        this.connectCount = 0;
      }
    }
  },
}
</script>

<style lang="less">
@keyframes rotate360-0
{
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
@keyframes rotate360-120
{
  0% {transform: rotate(120deg);}
  100% {transform: rotate(480deg);}
}
@keyframes rotate360-240
{
  0% {transform: rotate(240deg);}
  100% {transform: rotate(600deg);}
}

.rotate-animation(@animation:rotate360-0, @duration: 4s, @delay: 0s) {
  animation:@animation @duration infinite linear;
  animation-delay: @delay;
}

@homewidth: 84vw;
@homeheight: 84vh;

.limit-width(@minsize: 800px, @maxsize: 1000px) {
  min-width: @minsize;
  max-width: @maxsize;
}

.center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

#chat {
  margin: 0 auto;
  width: @homewidth;
  height: @homeheight;
  background: #f5f8fa;
  border-radius: 6vh;
  overflow: hidden;
  box-shadow: 0px 0px 20px #e1e0e4;
  .center;
  .limit-width(870px, 1300px);

  .chat-board {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    z-index: 20;

    .side-bar {
      width: @homewidth*0.29;
      height: @homeheight;
      z-index: 10;
      position: absolute;
      background: #fff;
      .limit-width(234px, 351px);
    }

    .chat-info {
      width: @homewidth*0.71;
      height: @homeheight;
      .limit-width(617.7px, 923px);
      z-index: 5;
      background: #f9f9fa;
      position: absolute;
      right: 0;
      overflow: hidden;

      .chat-content {
        width: 100%;
        height: @homeheight;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .chat-content > .chat-circle {
        width: 50vh;
        height: 50vh;
        border-radius: 50%;
        position: relative;
        margin: 6vh auto;
        background: #f1f0f6;
        overflow: hidden;
        margin: 0 auto;

        .chat-rect {
          width: 25vh;
          height: 4vh;
          background: #d7d3e4;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          margin: auto 0;
          transform-origin: right center;
        }

        .chat-rect:nth-child(1) {
          transform: rotate(0);
          .rotate-animation();
        }

        .chat-rect:nth-child(2) {
          transform: rotate(120deg);
          .rotate-animation(rotate360-120);
        }

        .chat-rect:nth-child(3) {
          transform: rotate(240deg);
          .rotate-animation(rotate360-240);
        }

        .time-day {
          display: block;
          width: 35vh;
          height: 35vh;
          font-size: 5vmin;
          text-align: center;
          border-radius: 50%;
          background: #fff;
          transition-property: background,color,box-shadow;
          transition-duration: 1s;
          color: #3c3463;

          .center;
          span {
            display: block;
            height: 35vh;
            line-height: 35vh;
            font-weight: 600;
          }
          &:hover {
            background-color: #f1f0f6;
            box-shadow: 0 0 3vh #c7bfda;
            cursor: pointer;
          }

        }
      }
    }
  }
}
</style>
