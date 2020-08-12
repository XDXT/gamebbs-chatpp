<template>
  <div id="chatApp">

    <div class="chat-bar">

      <div class="bar-header">
        <img v-if="me" :src="me.headimg" alt="">
        <div>{{username}}</div>
      </div>

      <div class="bar-body">
        <div @click="switchWindow" :class="{active: showChoose}">{{chooseName}}</div>
      </div>

    </div>


    <choose-chat 
      v-if="islogin"
      :friends="friends"
      :unreadFriends="unreadFriends"
      :chooseUser="chooseUser"
      :showChoose="showChoose"
    ></choose-chat>

    <chat-window 
      v-if="isChat"
      :showChoose="showChoose"
      :chatUser="chatUser"
      :newMsg="newMsg"
    ></chat-window>
  </div>
</template>

<script>
import chooseChat from '@/components/ChooseChat';
import chatWindow from '@/components/ChatWindow';

export default {
  components: {
    chooseChat,chatWindow
  },
  data() {
    return {
      islogin: false,
      isChat: false,
      friends: [],
      unreadFriends: [],
      newMsg: null,
      chatUser: null,
      chooseName: 'off',
      showChoose: true,
    };
  },
  computed: {
    username: function () {
      let user = this.me;
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
  created() {
    this.me = this.$store.state.me;
    this.socket = this.$store.state.chat.socket;
    this.isFirst = true;
  },
  mounted() {
    if (this.socket == null) {
      this.changeStatus('Join');
      this.$router.replace({
        path: '/chat'
      });
      return;
    }
    let socket = this.socket;
    var self = this;
    this.changeStatus('login...')

    socket.emit('login');

    socket.on('login', function (data) {
      if (data.state == 'ok') {
        self.changeStatus('friends...');
      }
    });

    socket.on('users', function (data) {
      if (data.state == 'ok') {
        self.friends = data.users.filter((user,index) => {
          if (user.id != self.me.id) {
            return true;
          }
          return false;
        });
        if (self.isFirst) {
          self.isFirst = false;
          self.changeStatus('success');
          setTimeout(() => {
            self.changeStatus('chat');
            self.islogin = true;
          }, 500);
        }
      }
    });

    socket.on('message', function (data) {
      if (self.isChat && data.sender.id == self.chatUser.id) {
        self.newMsg = data;
      } else if (self.isChat && data.receiver.isroom == 1 && data.receiver.id == self.chatUser.id) {
        self.newMsg = data;
      } else {
        self.saveMsg(data, self.me);
      }
    });

    socket.on('unreadMsg', function (data) {
      if (data.state == 'fail' || data.messages.length < 1) {
        return;
      }
      let key = 'chatuser-' + self.me.id + '-';
      let newChatlist = {};

      for (let i = 0; i < data.messages.length; i++) {
        let msg = data.messages[i];
        let tkey = key + msg.sender;

        if (self.unreadFriends.indexOf(msg.sender) == -1) {
          self.unreadFriends.push(msg.sender);
          let storage = localStorage[tkey] || '[]';
          newChatlist[tkey] = JSON.parse(storage);
        }
        newChatlist[tkey].push(msg);
      }

      for (const key in newChatlist) {
        localStorage[key] = JSON.stringify(newChatlist[key]);
      }
    });

  },
  methods: {
    saveMsg(data, receiver) {
        let key = 'chatuser-' + receiver.id + '-' + data.sender.id;
        let storage = localStorage[key] || '[]';
        let newChatlist = JSON.parse(storage);
        this.unreadFriends.push(data.sender.id);
        newChatlist.push(data);
        localStorage[key] = JSON.stringify(newChatlist);
    },
    chooseUser(user) {
      this.chatUser = user;
      this.isChat = true;
      this.switchWindow();
      let index = this.unreadFriends.indexOf(user.id);
      if (index != -1) {
        this.unreadFriends.splice(index, 1);
      }
      this.socket.emit('readMsg', {
        sender: this.chatUser.id,
        receiver: this.me.id
      });

      this.updateMsg = true;
    },
    changeStatus(status) {
      this.$parent.status = status;
    },
    switchWindow() {
      if (this.chooseName == 'on') {
        this.showChoose = true;
        //this.isChat = false;
        this.chooseName = 'off';
      } else {
        this.chooseName = 'on';
        this.showChoose = false;
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.islogin) {
      this.islogin = false;
      this.$store.commit('discardSocket');
      this.changeStatus('disconnect...')
      setTimeout(()=>{
      this.changeStatus('join')
        next();
      },700);
    } else {
      next();
    }
  }
};
</script>

<style lang="less" scoped>
@homewidth: 84vw;
@homeheight: 84vh;

@chatwidth: @homewidth*0.71;
@chatheight: @homeheight;

#chatApp {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .chat-bar {
    width: 20%;
    height: @chatheight;
    background: #82adf7;
    border-top-left-radius: 6vh;
    border-bottom-left-radius: 6vh;
    overflow: hidden;
    .bar-header {
      width: 100%;
      height: 31%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;      
      img {
        width: @chatwidth*0.12;
        height: @chatwidth*0.12;
        border-radius: 50%;
        box-shadow: 0 0 5px #3a5273;
      }
      div {
        width: 100%;
        margin-top: 2vmin;
        text-align: center;
        font-size: 3.2vmin;
        word-wrap: break-word;
        color: #fdfffd;
        text-shadow: 0 0 3px #ffffff;  
      }
    }
    .bar-body {
      width: 100%;
      height: 69%;
      position: relative;
      div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-90%);
        width:7vw;
        height: 7vw;
        line-height: 7vw;
        font-size: 4vmin;
        text-align: center;
        background: #568aea;
        border-radius: 10vmin;
        transition: box-shadow .5s;
        box-shadow: 0 0 5px #0b56e0;
        &:hover {
          cursor: pointer;
        }
        &.active {
          box-shadow: 0 0 12px #0b56e0 inset;
        }
      }
    }
  }
}
</style>
