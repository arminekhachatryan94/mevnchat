<template>
<div class="padding-top-20">
        <div class="title h2 padding-top-10">Your messages with {{$route.params.username}}</div>
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
      messages: []
    }
  },
  created () {
    axios.get('http://localhost:3000/messages/' + this.$session.get('username') + '/' + this.$route.params.username).then(response => {
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
