<template>
<div class="padding-top-20">
  <div class="bg-success text-white" v-text="this.$session.flash.get('newmsg')"></div>
  <div class="title h2 padding-top-10">Your messages with {{$route.params.username}}</div>
  <div v-if="this.$session.get('auth')" class="padding-top-20">
    <div v-if="messages.length == 0" class="padding-30">
      No messages
    </div>
    <div class="margin-lr-100">
      <div v-if="messages.length" id="scrollbox" v-chat-scroll>
        <message class="margin-bottom-10 margin-top-10"
          v-for="message in messages"
          :sender="message.sender"
          :recipient="message.recipient"
          :text="message.text"
          :date="message.date"
          :key="message.id">
        </message>
      </div>
    </div>

    <!-- new message -->
    <div class="margin-top-10">
      <form method="POST" @submit.prevent="onSubmit">
        <div class="form-group">
          <div>
            <textarea class="textarea" v-model="msg.text" v-on:keydown="deleteError" placeholder="New Message" required></textarea>
          </div>
        </div>
        <button type="submit" class="btn">Send Message</button>
      </form>
      <div v-if="error.length" v-text="error" class="text-danger"></div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Message from '../components/Message'

export default {
  name: 'Conversation',
  components: { Message },
  data () {
    return {
      messages: [],
      msg: {
        sender: '',
        recipient: '',
        text: ''
      },
      error: ''
    }
  },
  sockets: {
    connect: function(){
      console.log('socket connected');
    },
    newmsg: function(data) {
      if( (data.sender == this.msg.sender && data.recipient == this.msg.recipient)
      || (data.recipient == this.msg.sender && data.sender == this.msg.recipient) ){
        this.messages.push(data);
      }
    }
  },
  created () {
    this.msg.sender = this.$session.get('username');
    this.msg.recipient = this.$route.params.username;
    axios.get('http://localhost:3000/messages/' + this.$session.get('username') + '/' + this.$route.params.username).then(response => {
      this.messages = response.data.messages
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    onSubmit(){
      axios.post('http://localhost:3000/newmessage', {
        sender: this.msg.sender,
        recipient: this.msg.recipient,
        text: this.msg.text
      })
      .then((response) => {
        this.$session.start();
        this.$session.flash.set('newmsg', 'Successfully sent message.');
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        this.error = error.response.data
      });
      this.msg.text = '';
      this.error = '';
    },
    deleteError() {
      this.error = '';
    }
  }
}
</script>

<style>
.padding-30 {
    padding: 30px;
}
.padding-top-10 {
  padding-top: 10px;
}
.padding-top-20 {
  padding-top: 20px;
}
.padding-top-80 {
    padding-top: 80px;
}
#home {
    color: rgb(145, 204, 105);
    font-family:'Courier New', Courier, monospace
}
.title {
  color: rgb(145, 204, 105);
}
.margin-top-10 {
  margin-top: 10px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.margin-lr-100 {
  margin-left: 100px;
  margin-right: 100px;
}
/* scrollbox */
#scrollbox {
  height: 300px;
  width: 100%;
  overflow: auto;
  border: 2px solid rgba(145, 204, 105, 0.295);
}
/* scroll bar */
#scrollbox::-webkit-scrollbar {
    width: 1em;
}
#scrollbox::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(145, 204, 105, 0.712);
}
#scrollbox::-webkit-scrollbar-thumb {
  background-color: rgb(145, 204, 105);
  outline: 1px solid slategrey;
}
/* new message */
.msg-container {
  border: 2px solid rgb(145, 204, 105);
  margin-left: 100px;
  margin-right: 100px;
}
.margin-top-10 {
    margin-top: 10px;
}
.padding-top-10 {
    padding-top: 10px;
}
.padding-bottom-10 {
    padding-bottom: 10px;
}
.padding-20 {
    padding: 20px;
}
.btn {
    color: white;
    background-color:  rgb(145, 204, 105);
    font-weight: bold;
}
.textarea {
  width: 500px;
  height: 100px;
}
</style>
