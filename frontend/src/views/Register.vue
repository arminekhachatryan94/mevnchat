<template>
<div>
  <div id="title" class="display-4 padding-top-50">Register</div>
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
        <button type="submit" class="btn">Create Account</button>
      </div>
    </form>
    <div v-if="error.length" v-text="error" class="text-danger"></div>
    <div></div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
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
      axios.post('http://localhost:3000/register', {
        username: this.credentials.username,
        password: this.credentials.password
      })
      .then((response) => {
        location.href = '/#/login'
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
    isSuccess () {
      if (this.success.length == 0) {
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
