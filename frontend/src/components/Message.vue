<template>
    <div class="msg-container">
        <div class="username" v-text="message.username"></div>
        <div class="text" v-text="message.text"></div>
        <div class="date" v-text="message.date"></div>
    </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      message: {
        username: 'ani',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '1:13PM on May 3, 2018'
      }
    }
  }
}
</script>

<style scoped>
.msg-container {
    border: 4px solid rgb(145, 204, 105);
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
</style>
