<template>
    <div class="msg-container padding-20 margin-top-10">
        <form method="POST" @submit.prevent="onSubmit">
            <div class="form-group">
                <div>Recipient:</div>
                <div>
                    <select v-model="message.recipient" class="select" value="default" required>
                        <option value="default" selected disabled>Select a Recipient</option>
                        <option v-for="user in users" v-if="user.username != message.sender" v-text="user.username" v-bind:key="user.id" :value="user.username"></option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div>Message:</div>
                <div>
                    <textarea v-model="message.text" placeholder="New Message" class="w50" required></textarea>
                </div>
            </div>
            <button type="submit" class="btn">Send Message</button>
        </form>
        <div v-if="error.length" v-text="error" class="text-danger"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewMessage',
  data() {
    return {
        users: [],
        message: {
            sender: '',
            recipient: '',
            text: ''
        },
        error: ''
    }
  },
  methods: {
    onSubmit(){
      axios.post('http://localhost:3000/newmessage', {
        sender: this.message.sender,
        recipient: this.message.recipient,
        text: this.message.text
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
      this.message.recipient = '';
      this.message.text = '';
    }
  },
  created() {
    this.message.sender = this.$session.get('username');
    axios.get('http://localhost:3000/users').then(response => {
      this.users = response.data
    }).catch(e => {
      console.log(e)
    });
  }
}
</script>

<style scoped>
.msg-container {
    border: 2px solid rgb(145, 204, 105);
    margin-left: 200px;
    margin-right: 200px;
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
.w50 {
    width: 50%;
}
</style>
