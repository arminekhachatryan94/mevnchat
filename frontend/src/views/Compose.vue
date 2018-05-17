<template>
<div class="padding-top-20">
    <div class="bg-success text-white" v-text="this.$session.flash.get('newmsg')"></div>
    <div id="title" class="display-4">New Message</div>
    <new-message v-if="this.$session.get('auth')"></new-message>
</div>
</template>

<script>
import NewMessage from '../components/NewMessage'

export default {
  name: 'Compose',
  components: { NewMessage },
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
#title {
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
