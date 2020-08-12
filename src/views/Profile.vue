<template>
  <div id="profile">
    <div class="profile-board">
      <!-- slide-bar 侧边导航栏 start -->
      <slide-bar activeName="profile"></slide-bar>
      <!-- slide-bar 侧边导航栏 end -->
      <!-- content 侧边导航栏 start -->
      <div class="profile-info">
        <div class="profile-title">
          Your score
        </div>

        <div class="profile-content">
          <div class="header">
            <div class="headimg">
              <img :src="user.headimg" alt="head image">
            </div>
            <div class="username">{{username}}</div>
          </div>
          <div class="score"></div>
        </div>
      </div>
      <!-- content 侧边导航栏 end -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SlideBar from '@/components/SideBar'
// import echarts from 'echarts'
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  name: 'Profile',
  components: {
    SlideBar
  },
  data() {
    return {
      date: "",
      timeDay: ""
    }
  },
  async mounted() {
    if (this.$store.state.me == null) {
      let res = await axios.get(this.$root.api.UserInfo);
      this.$store.commit('setMe', res.data.user);
    }
    let user = this.$store.state.me;
    var dom = document.querySelector('.score');
    var myChart = echarts.init(dom);
    var option = {
        title: {
            text: 'Game Score'
        },
        tooltip: {},
        legend: {
            data:['score']
        },
        xAxis: {
            data: ["escape","flappyBird"]
        },
        yAxis: {},
        series: [{
            name: 'score',
            type: 'bar',
            data: [user.escape, user.flappyBird]
        }]
    };
    myChart.setOption(option);

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
}
</script>

<style lang="less" scoped>
.fillet-rect(@size: 1px, @color: #f5f8fa, @move: 5%,@radius: 5%, @index: 0) {
    content: "";
    position: absolute;
    height: @size;
    width: @size;
    top: 0;
    background-color: @color;
    transform: translateX(@move);
    border-radius: @radius;
    z-index: @index;
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

#profile {
  margin: 0 auto;
  width: @homewidth;
  height: @homeheight;
  background: #f5f8fa;
  border-radius: 6vh;
  overflow: hidden;
  box-shadow: 0px 0px 20px #e1e0e4;
  .center;
  .limit-width(870px, 1300px);

  .profile-board {
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
      float: left;
      background: #fff;
      .limit-width(234px, 351px);
    }

    .profile-info {
      width: @homewidth*0.71;
      height: @homeheight;
      .limit-width(617.7px, 923px);
      z-index: 5;
      background: #f9f9fa;
      position: absolute;
      right: 0;
      .profile-title {
        font-size: 4vmin;
        font-weight: 600;
        text-align: left;
        text-indent: 10vmin;
        line-height: 15vh;
        height: 15vh;
      }
      .profile-content {
        width: 100%;
        height: 67vh;
        overflow: hidden;
        .header {
          height: 20vh;
          width: 80%;
          margin: 0 auto;
          font-size: 4vmin;
        }

        .header > .headimg{
          width: 11vmin;
          height: 100%;
          float: left;
        }

        .header > .username{
          line-height: 10vmin;
          width: 70%;
          height: 100%;
        }

        .header > .headimg > img {
          width: 10vmin;
          height: 10vmin;
          border-radius: 50%;
        }

        .score {
          clear: both;
          width: 80%;
          margin: 0 auto;
          height: 47vh;
        }
      }

    }
  }
}
</style>
