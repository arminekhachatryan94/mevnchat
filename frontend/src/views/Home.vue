<template>
<div class="padding-top-20">
    <div v-if="this.$session.get('auth')">
        <div class="bg-success text-white" v-text="this.$session.flash.get('loggedin')"></div>
        <div class="title display-4 padding-top-10">Recent Activity</div>
        <div class="padding-top-20">
            <div v-if="messages.length == 0" class="padding-30">
                No messages
            </div>
            <div v-if="messages.length">
                <message class="margin-bottom-20"
                    v-for="message in messages"
                    :sender="message.sender"
                    :recipient="message.recipient"
                    :text="message.text"
                    :date="message.date"
                    :key="message.id">
                </message>
            </div>
        </div>
        <new-message></new-message>
        <script type="text/script">
        console.log("hi");
        var socket = io('http://localhost'); // connect to server
        socket.on('newmsg', function(data) { // listen for fromServer message
            console.log('Sender: ' + data.sender + ', recipient: ' + data.recipient + ', text: ' + data.text);
        });
        </script>
    </div>
    <div v-if="!this.$session.get('auth')" class="padding-top-80">
        <div id="home" class="display-1">
            iChat Home
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Message from '../components/Message'
import NewMessage from '../components/NewMessage'

export default {
  name: 'Home',
  components: { Message, NewMessage },
  data () {
    return {
      messages: []
    }
  },
  created () {
    axios.get('http://localhost:3000/messages').then(response => {
      this.messages = response.data.messages
    }).catch(e => {
      console.log(e)
    })
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
.margin-bottom-20 {
    margin-bottom: 20px;
}
</style>
