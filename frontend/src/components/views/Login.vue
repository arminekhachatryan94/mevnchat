<template>
<div>
  <div id="title" class="display-4">Login</div>
  <div class="padding-top-40">
    <form>
      <div class="form-group">
        <div>
          <label for="username">Username</label>
        </div>
        <div>
          <input type="text" id="username" v-model="credentials.username">
        </div>
      </div>
      <div class="form-group">
        <div>
          <label for="password">Password</label>
        </div>
        <div>
          <input type="text" id="password" v-model="credentials.password">
        </div>
      </div>
      <div class="form-group">
        <button type="button">Login</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title {
  color: rgb(145, 204, 105);
}
.padding-top-40 {
  padding-top: 40px;
}
</style>
