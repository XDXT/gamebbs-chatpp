<template>
  <div id="home">
    <div class="home-board">
      <!-- slide-bar 侧边导航栏 start -->
      <slide-bar activeName="home"></slide-bar>
      <!-- slide-bar 侧边导航栏 end -->
      <!-- content 内容区 start -->
      <div class="home-info">
        <div class="home-title">
          {{username}} - welcome back
        </div>

        <div class="home-content">
          <div class="home-circle">
            <div class="time-day">
              <span>{{date}}</span>
              <span>{{timeDay}}</span>
            </div>
          </div>
        </div>

      </div>
      <!-- content 内容区 end -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SlideBar from '@/components/SideBar'

export default {
  name: 'Home',
  components: {
    SlideBar
  },
  data() {
    return {
      timer: 0,
      date: "无法获取时间",
      timeDay: ""
    }
  },
  async mounted() {
    this.updateTime();
    this.timer = setInterval(()=> {
      this.updateTime();
    }, 1000*60)

    if (this.$store.state.me == null) {
      let res = await axios.get(this.$root.api.UserInfo);
      this.$store.commit('setMe', res.data.user);
    }
  },
  computed: {
    user: function () {
      if (this.$store.state.me != null) {
        return this.$store.state.me;
      } else {
        return {}
      }
    },
    username: function () {
      let user = this.$store.state.me;
      if (!user) {
        return "";
      }
      if (user.nickname) {
        return user.nickname;
      } else {
        return user.username;
      }
    },
  },
  methods: {
    updateTime() {
      let d = new Date();
      let h = d.getHours();
      let m = d.getMinutes();

      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }

      if (h < 12) {
        this.timeDay = "早上好";
      } else if (h < 18){
        this.timeDay = "下午好";
      } else {
        this.timeDay = "晚上好";
      }
      let time = h+" : "+m;
      this.date = time;
    }
  },
  beforeRouteLeave (to, from, next) {
    // 清除计时器
    clearInterval(this.timer);
    next();
  }
}
</script>

<style lang="less" scoped>
@homewidth: 84vw;
@homeheight: 84vh;

.limit-width(@minsize: 800px, @maxsize: 1000px) {
  min-width: @minsize;
  max-width: @maxsize;
}

@keyframes rotate30
{
  0% {transform: rotate(-30deg);}
  50% {transform: rotate(30deg);}
  100% {transform: rotate(-30deg);}
}

.center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

#home {
  margin: 0 auto;
  width: @homewidth;
  height: @homeheight;
  background: #f5f8fa;
  border-radius: 6vh;
  overflow: hidden;
  box-shadow: 0px 0px 20px #e1e0e4;
  .center;
  .limit-width(870px, 1300px);

  .home-board {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    z-index: 20;

    .side-bar {
      top: 0;
      left: 0;
      width: @homewidth*0.29;
      height: @homeheight;
      z-index: 10;
      position: absolute;
      background: #fff;
      .limit-width(234px, 351px);
    }

    .home-info {
      width: @homewidth*0.71;
      height: @homeheight;
      .limit-width(617.7px, 923px);
      z-index: 5;
      background: #f9f9fa;
      position: absolute;
      right: 0;
      .home-title {
        font-size: 4vmin;
        font-weight: 600;
        text-align: left;
        text-indent: 10vmin;
        line-height: 15vh;
        height: 15vh;
      }
      .home-content {
        width: 100%;
        height: 67vh;
        overflow: hidden;
      }

      .home-content > .home-circle {
        width: 50vh;
        height: 50vh;
        border-radius: 50%;
        position: relative;
        margin: 6vh auto;
        background: linear-gradient(#f1f0f6, #d9d4e4);
        overflow: hidden;
        .time-day {
          width: 40vh;
          height: 40vh;
          font-size: 5vmin;
          text-align: center;
          border-radius: 50%;
          background: #fff;
          .center;
          box-shadow: 0 4vh 3vh 0 #cfc5e4;
          animation:rotate30 5s infinite;
          span {
            display: block;
            height: 20vh;
            font-weight: 600;
            color: #3c3463;
          }
          span:nth-child(1) {
            line-height: 35vh;
          }

          span:nth-child(2) {
            font-size: 4vmin;
            line-height: 17vh;
          }
        }

      }
    }
  }
}
</style>
