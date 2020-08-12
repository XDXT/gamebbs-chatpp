<template>
  <div id="chooseUser" :class="{ isshow: showChoose }">
    <div class="choose-title">Contact</div>

    <div class="choose-group">
      <div class="group-title">G</div>

      <div class="group-list">
        <div class="group-item" 
          v-for="(room,index) in rooms" 
          :key="index"
          @click="chooseUser(room)">
          <div class="group-headimg">
            <img :src="room.headimg" alt="">
            <div class="msg-tips" v-show="unreadFriends.indexOf(room.id) != -1"></div>
          </div>

          <div class="group-name">{{room.username}}</div>
        </div>

      </div>
    </div>

    <div class="choose-group">
      <div class="group-title">F</div>

      <div class="group-list">
        <div class="group-item" 
          v-for="(user,index) in friends" 
          :key="index"
          @click="chooseUser(user)">

          <div class="group-headimg">
            <img :src="user.headimg" alt="user head image" :class="{outline: user.isonline==0}">
            <div class="msg-tips" v-show="unreadFriends.indexOf(user.id) != -1"></div>
          </div>

          <div class="group-name">{{user.nickname?user.nickname:user.username}}</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ["friends", "unreadFriends", "chooseUser", "showChoose"],
  data() {
    return {
      rooms: [
        {
          id: -1,
          isroom: 1,
          isonline: 1,
          username: "flappy",
          socketid: "flappy",
          headimg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1482435028,708850152&fm=26&gp=0.jpg",
        },
        {
          id: -2,
          isroom: 1,
          isonline: 1,
          username: "escape",
          socketid: "escape",
          headimg:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3357372281,722869554&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  computed: {
    getFriends: function() {
      if (this.$store.state.me == null) {
        return [];
      }
      let myname = this.$store.state.me.username;
      let friends = this.users.filter((user, index) => {
        return item.username != myname;
      });
      return friends;
    },
  },
  mounted() {
  },
};
</script>

<style lang="less">
@homewidth: 84vw;
@homeheight: 84vh;

@chatwidth: @homewidth*0.71;
@chatheight: @homeheight;

#chooseUser {
  width: 0;
  height: 100%;
  overflow: hidden;
  transition: all 0.8s;
  background: #f8fbfb;
  font-size: 5vmin;

  &::-webkit-scrollbar {
    width: 5px; 
    height:10px;
    background-color:#86b6f9;
  }
  &::-webkit-scrollbar-track {
    -box-shadow: inset 0 0 6px #bbcff0;  
    border-radius: 10px;
    background-color:#d3e1f7;    
  }
  &::-webkit-scrollbar-thumb  {
    border-radius: 10px;
    box-shadow: inset 0 0 6px #c0d2f0;  
    background-color:#86b6f9;
  }
  overflow-y: scroll;
  .choose-title {
    width: 100%;
    height: 10vmin;
    line-height: 10vmin;
    margin-left: 4vmin;
    font-size: 5.2vmin;
    font-weight: 600;
    color: #0b0e0e;
    text-shadow: 1px 1px 4px #b7bfca;
  }
  .choose-group {
    width: 40.5vw;
    margin-left: 6vmin;
    margin-bottom: 5vmin;
    .group-title {
      font-size: 4.1vmin;
      height: 7vmin;
      color: #1f6ef7;
      font-weight: bolder;
      text-shadow: 0 0 3px #b7bfca;
    }
    .group-list {
      margin-left: 4vmin;
    }
    .group-list > .group-item {
      display: flex;
      height: 13vmin;
      width: 38vw;
      line-height: 13vmin;
      align-items: center;
      transition: all .6s;
      &:nth-child(n) {
        border-top: 3px solid #e9e6e6;
      }
      &:last-child {
        border-bottom: 3px solid #e9e6e6;
      }
      &:hover {
        background: #f2f4f8;
        box-shadow: 0 0 12px #abc5ec;
      }
      .group-headimg {
        width: 10vmin;
        height: 10vmin;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0 0 5px #b7bfca;
        }
        img.outline {
          filter: grayscale(0.8);
        }
        .msg-tips {
          width: 1.2vmin;
          height: 1.2vmin;
          position: absolute;
          background: #e75a5a;
          right: 0;
          bottom: 0;
          border-radius: 50%;
        }
      }
      .group-name {
        margin-left: 2vmin;
        font-size: 4.5vmin;
        color: #2f2f30;
        width: 30vmin;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0 0 3px #b7bfca;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }  
}

#chooseUser.isshow {
  width: 80%;
}
</style>
