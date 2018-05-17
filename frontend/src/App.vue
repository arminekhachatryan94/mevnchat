<template>
  <div id="app">
    <navbar @clicked="onClickChild"></navbar>
    <router-view/>
    <div v-text="a"></div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data () {
    return {
      a: 1,
    }
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
  color: #2c3e50;
}
</style>
