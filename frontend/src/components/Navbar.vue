<template>
    <nav class="text-white row col-md-12 padding-top-10">
        <span class="col-md-6 text-left">
            <router-link :to="{ name: 'Home' }" id="title">iChat</router-link>
            <router-link :to="{ name: 'Messages' }">Messages</router-link>
        </span>
        <div class="col-md-6 text-right">
            <router-link :to="{ name: 'Register' }" class="align-middle">Register</router-link>
            <router-link :to="{ name: 'Login' }" class="align-middle">Login</router-link>
        </div>
        <button v-on:click="onClickButton">Add 1</button>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    onClickButton (event) {
      this.$emit('clicked', 1)
    }
  }
}
</script>

<style scoped>
nav{
    background-color: rgb(145, 204, 105);
    width: 100%;
}
a {
    color: white;
    font-size: 20px;
    padding: 5px;
}
#title {
    font-size: 30px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
#height {
    height: 100px;
}
.padding-top-10 {
    padding-top: 10px;
}
</style>
