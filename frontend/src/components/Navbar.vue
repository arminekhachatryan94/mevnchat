<template>
    <nav class="text-white row col-md-12 padding-top-10">
        <span class="col-md-6 text-left">
            <router-link :to="{ name: 'Home' }" id="title">iChat</router-link>
            <router-link v-if="this.auth" :to="{ name: 'Messages' }">Messages</router-link>
        </span>
        <div class="col-md-6 text-right">
            <router-link v-if="!this.auth" :to="{ name: 'Register' }" class="align-middle">Register</router-link>
            <router-link v-if="!this.auth" :to="{ name: 'Login' }" class="align-middle">Login</router-link>
            <a v-if="this.auth" v-text="this.$session.get('username')"></a>
            <a href="" v-on:click="logout" v-if="this.auth">Log out</a>
        </div>
        <button v-on:click="onClickButton">Add 1</button>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      auth,
    }
  },
  methods: {
    onClickButton (event) {
      this.$emit('clicked', 1)
    },
    logout() {
      this.$session.destroy();
    },
    changeAuth(data) {
      this.auth = data;
    }
  },
  created() {
    if( this.$session.get('auth') ){
      this.auth = true;
    } else{
      this.auth = false;
    }
  },
  mounted() {
    this.$eventHub.$on('logged', this.changeAuth);
  },
  beforeDestroy() {
    this.$eventHub.$off('logged');
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
