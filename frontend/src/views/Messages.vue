<template>
<div>
    <div class="title display-4 padding-top-10">Messages</div>
    <div class="padding-top-20">
      <message class="margin-bottom-20"
        v-for="message in messages"
        :username="message.username"
        :text="message.text"
        :date="message.date"
        :key="message.id">
      </message>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Message from '../components/Message'

export default {
  name: 'Messages',
  components: { Message },
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
.title {
  color: rgb(145, 204, 105);
}
.margin-bottom-20 {
    margin-bottom: 20px;
}
.padding-top-10 {
  padding-top: 10px;
}
.padding-top-20 {
  padding-top: 20px;
}
</style>
