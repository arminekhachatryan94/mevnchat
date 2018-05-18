<template>
  <div id="app">
    <navbar @clicked="onClickChild"></navbar>
    <br>
    <br>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data () {
    return {}
  },
  methods: {
    onClickChild (value) {
      this.a += value
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
