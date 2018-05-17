<template>
    <div class="msg-container cursor" v-on:click="clicked">
        <div class="username">
            <div v-if="ifSender()"><i class="green">You sent to</i> {{this.recipient}}</div>
            <div v-if="!ifSender()">{{this.sender}}</div>
        </div>
        <div class="text" v-text="text"></div>
        <div class="date" v-text="dateTime(date)"></div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Message',
  props: {
    sender: String,
    recipient: String,
    text: String,
    date: String
  },
  methods: {
    dateTime: function(date) {
      return moment(date).format('MMMM DD YYYY, h:mma');
    },
    ifSender() {
      if( this.sender == this.$session.get('username') ){
        return true;
      }
      else {
        return false;
      }
    },
    clicked() {
      if( this.ifSender() ){
        location.href="/#/messages/" + this.recipient;
      } else{
        location.href="/#/messages/" + this.sender;
      }
    }
  }
}
</script>

<style scoped>
.msg-container {
    border: 2px solid rgb(145, 204, 105);
    border-radius: 25px;
    margin-left: 200px;
    margin-right: 200px;
}
.username {
    text-align: left;
    padding-left: 30px;
    padding-top: 10px;
    font-size: 20px;
}
.text {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    text-align: left;
}
.date {
    text-align: right;
    padding-right: 30px;
    padding-bottom: 10px;
    font-style: italic;
    font-size: 13px;
}
.cursor {
    cursor: pointer;
}
.green {
    color: rgb(145, 204, 105);
}
</style>
