<template>
<div>
    <div class="title display-4 padding-top-10">Messages</div>
    <div class="padding-top-20">
      <div v-if="conversations.length == 0">
        No Conversations
      </div>
      <div v-if="conversations.length">
        <!-- conversations -->
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Messages',
  data () {
    return {
      conversations: []
    }
  },
  created () {
    axios.get('http://localhost:3000/convos/' + this.$session.get('username') ).then(response => {
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
