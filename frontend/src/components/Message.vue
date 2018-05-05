<template>
    <div class="msg-container">
        <div class="username" v-text="username"></div>
        <div class="text" v-text="text"></div>
        <div class="date" v-text="date"></div>
    </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    username: String,
    text: String,
    date: String
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
</style>
