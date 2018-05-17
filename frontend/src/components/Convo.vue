<template>
    <div class="msg-container">
        <div class="col-md-12 row cursor" v-on:click="clicked">
            <div class="col-md-4">
                <div class="username text-left">
                    <div v-if="!ifSender()">
                        <div v-text="this.sender"></div>
                    </div>
                    <div v-if="ifSender()">
                        <div v-text="this.recipient"></div>
                        <small><span class="fa fa-mail-reply green"></span></small>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="text text-right" v-text="text"></div>
                <div class="date text-right" v-text="dateTime(date)"></div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Convo',
  props: {
    sender: String,
    recipient: String,
    text: String,
    date: String,
    cursor: 'pointer'
  },
  methods: {
    dateTime: function(date) {
      return moment(date).format('MMMM DD YYYY, h:mma');
    },
    ifSender() { // if logged in user is the sender
      if( this.sender == this.$session.get('username') ){
        return true;
      } else{
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
    border: .5px solid rgb(145, 204, 105);
    margin-left: 150px;
    margin-right: 150px;
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
.green {
    color: rgb(145, 204, 105);
}
.cursor {
    cursor: pointer;
}
</style>
