<template>
    <nav class="text-white row col-md-12 padding-top-10">
        <span class="col-md-8 text-left">
            <router-link :to="{ name: 'Home' }" id="title-nav">iChat</router-link>
            <router-link v-if="this.auth0" :to="{ name: 'Messages' }">Messages</router-link>
            <router-link v-if="this.auth0" :to="{ name: 'Compose' }">Compose</router-link>
        </span>
        <div class="col-md-4 text-right">
            <router-link v-if="!this.auth0" :to="{ name: 'Register' }" class="align-middle">Register</router-link>
            <router-link v-if="!this.auth0" :to="{ name: 'Login' }" class="align-middle">Login</router-link>
            <a v-if="this.auth0" v-text="this.username"></a>
            <a href="" v-on:click="logout" v-if="this.auth0">Log out</a>
        </div>
        <button v-on:click="onClickButton">Add 1</button>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      username: this.username0,
      auth: this.auth0
    }
  },
  created() {
  },
  computed: {
    username0() {
      return ( (this.$store.state.auth !== false) ? this.$state.state.username : '' );
    },
    auth0() {
      return ( (this.$store.state.auth !== false) ? this.$store.state.auth : false );
    }
  },
  methods: {
    onClickButton (event) {
      this.$emit('clicked', 1)
    },
    logout() {
      this.$session.destroy();
      this.$store.commit('logout');
    },
    /*
    changeAuth(data) {
      this.auth = data;
    }*/
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
#title-nav {
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
