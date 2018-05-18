<template>
<div>
  <div class="bg-success text-white" v-text="this.$session.flash.get('registered')"></div>
  <div id="title" class="display-4 padding-top-50">Login</div>
  <div class="padding-top-30">
    <form method="POST" @submit.prevent="onSubmit">
      <div class="form-group">
        <div>
          <label for="username">Username</label>
        </div>
        <div>
          <input type="text" id="username" v-model="credentials.username" @keydown="deleteError" required>
        </div>
      </div>
      <div class="form-group">
        <div>
          <label for="password">Password</label>
        </div>
        <div>
          <input type="text" id="password" v-model="credentials.password" @keydown="deleteError" required>
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn">Login</button>
      </div>
    </form>
    <div v-if="error.length" v-text="error" class="text-danger"></div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    onSubmit () {
      axios.post('http://localhost:3000/login', {
        username: this.credentials.username,
        password: this.credentials.password
      })
      .then((response) => {
        this.$session.start()
        this.$session.flash.set('loggedin', 'Successfully logged in! Enjoy iChat.')
        this.$session.set('auth', true)
        this.$session.set('username', response.data)
        this.$store.commit('login', response.data)
        console.log(this.$store.state.auth)
        location.href = '/#/'
      })
      .catch((error) => {
        this.error = error.response.data
      })
      this.credentials.username = ''
      this.credentials.password = ''
    },
    isError () {
      if (this.error.length == 0) {
        return false
      } else {
        return true
      }
    },
    deleteError () {
      this.error = ''
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
