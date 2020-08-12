<template>
  <div id="chatWindow" :class="{ isshow: !showChoose }">

    <div class="chat-user">
        <img class="user-headimg" :src="chatUser.headimg" alt="" :class="{outline: chatUser.isonline==0}">
        <div class="user-name">{{chatUser.nickname?chatUser.nickname:chatUser.username}}</div>
    </div>

    <div class="chat-w-content">

      <div class="msg-list" ref="chatbox">
        <div class="msg-item"
          v-for="(msg,index) in messageList"
          :key="index"
          :class="{'self-msg': me.id == msg.sender.id}"
        >
          <div class="msg-content">{{msg.message}}</div>
        </div>
      </div>

      <div class="input">
          <input type="text" v-model="inputMessage" @keydown.enter.ctrl.exact="sendMsg">
          <div @click="sendMsg">S</div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: ["showChoose", "chatUser", "newMsg", "updateMsg"],
  data() {
    return {
      inputMessage: '',
      messageList: []
    }
  },
  created() {
    this.me = this.$store.state.me;
    this.socket = this.$store.state.chat.socket;
    this.messageList = [];
    this.loadStorage();
  },
  mounted() {
      this.scrollBottom();
  },
  updated() {
      this.scrollBottom();
  },
  watch: {
      newMsg: function (msg) {
          // 私聊消息
          if (msg.receiver.id == this.me.id) {
              this.messageList.push(msg);
              // 群聊消息
          } else if (this.chatUser.isroom == 1 && msg.receiver.id == this.chatUser.id ) {
              // 不接受自己的群发消息
              if (msg.sender.id != this.me.id) {
                  this.messageList.push(msg);
              }
          }
      },
      chatUser: function (user) {
        this.messageList = [];
        this.loadStorage();
      }
  },
  methods: {
    saveStorage: function () {
      let key = 'chatuser-'+ this.me.id + '-' + this.chatUser.id;
      localStorage[key] = JSON.stringify(this.messageList);
    },
    loadStorage: function () {
        let key = 'chatuser-'+ this.me.id + '-' + this.chatUser.id;
        if (typeof localStorage[key] !== 'undefined') {
            this.messageList = JSON.parse(localStorage[key]) || [];
        }
    },
    scrollBottom: function () {
        let chatbox = this.$refs.chatbox;
        chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
    },
    sendMsg: function () {
        let msg = {
            sender: this.me,
            receiver: this.chatUser,
            message: this.inputMessage,
            time: new Date().getTime()
        };
        this.messageList.push(msg);
        this.socket.emit('message', msg);
        this.inputMessage = '';
        this.saveStorage();
    },
  },
};
</script>

<style lang="less">
@homewidth: 84vw;
@homeheight: 84vh;

@chatwidth: @homewidth*0.71;
@chatheight: @homeheight;

#chatWindow {
  width: 0;
  height: 100%;
  overflow: hidden;
  transition: all 0.8s;
  background: #f3f7fd;
  font-size: 5vmin;
  .chat-user {
    width: 100%;
    height: 15vmin;
    display: flex;
    justify-content: center;
    align-items: center;

    .user-headimg {
      width: 11vmin;
      height: 11vmin;
      border-radius: 50%;
      margin-right: 5vmin;
      box-shadow: 0 0 8px #b7bfca;
    }
    .user-headimg.outline {
      filter: grayscale(0.8);
    }
    .user-name {
      text-shadow: 0 0 3px #b7bfca;
    }
  }
  .chat-w-content {
    width: 100%;
    height: 69vh;
    background: #fff;
    border-top-left-radius: 6vmin;
    border-top-right-radius: 6vmin;
    box-shadow: 0 0 8px #ebeef3;
    display: block;
    .msg-list {
      width: 85%;
      height: 80%;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      overflow-y: scroll;
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
      display: flex;
      flex-direction: column;
      .msg-item {
        width: 98%;
        margin: 0 auto;
        .msg-content {
          max-width: 80%;
          width: fit-content;
          font-size: 2vh;
          margin-top: 1vmin;
          color: #adacb2;
          background: #f8fbfb;
          padding: 1vmin 2vmin 1vmin 2vmin;
          border-radius: 2vmin;
          word-wrap: break-word;
          word-break:normal;
          float: left;
        }
      }
      .msg-item.self-msg {
        .msg-content {
          color: #dbe8ff;
          background: #4b87fa;
          float: right;
        }
      }
    }
    .input {
      width: 85%;
      height: 7vh;
      display: flex;
      margin: 10px auto;
      position: relative;
    }
    .input > input {
      width: 100%;
      height: 7vh;
      border-radius: 7vh;
      outline: none;
      border: none;
      box-shadow: 0 0 5px #d7dde7;
      color: #c2c2c2;
      font-size: 2vh;
      text-indent: 4vmin;
    }
    .input > div {
      position: absolute;
      right: 1vw;
      width: 6vh;
      height: 6vh;
      background: #edf3fc;
      text-align: center;
      line-height: 6vh;
      font-size: 3.3vh;
      color: #5080f9;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 15px #f6fafe;
      transition: all .5s;
      &:hover {
        cursor: pointer;
        background: #7aabf5;
        color: #f9fafc;
      }
    }
  }
}

#chatWindow.isshow {
  width: 80%;
}

</style>
