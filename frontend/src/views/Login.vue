<template>
<div>
  <div class="bg-success text-white" v-text="this.$session.flash.get('login')"></div>
  <div id="title" class="display-4 padding-top-50">Login</div>
  <div class="padding-top-30">
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
        <button type="button" class="btn">Login</button>
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

<style scoped>
#title {
  color: rgb(145, 204, 105);
}
.padding-top-30 {
  padding-top: 30px;
}
.padding-top-50 {
  padding-top:50px;
}
.btn {
    color: white;
    background-color:  rgb(145, 204, 105);
    font-weight: bold;
}
.form-group {
  margin-bottom: 20px;
}
</style>
