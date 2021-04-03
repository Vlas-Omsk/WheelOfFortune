<template>
  <div class="login">
    <div class="form">
      <div class="field">
        <label>Username</label>
        <input type="text" v-model="username" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="text" v-model="password" />
      </div>
      <div class="buttons-container">
        <button class="btn" @click="signIn()">Sign in</button>
        <button class="btn" @click="signUp()">Sign up</button>
      </div>
    </div>
  </div>
</template>

<script>
import { postData, showToast } from '@/methods'
import { data } from '@/data'

export default {
  data() {
    return {
      username: "",
      password: "",
      data
    }
  },
  methods: {
    success(data) {
      this.data.account = data;

      this.$router.push("/");
    },
    signIn() {
      postData('/api/signin', {
        username: this.username,
        password: this.password
      }, (err) => showToast(err.error), this.success);
    },
    signUp() {
      postData('/api/signup', {
        username: this.username,
        password: this.password
      }, (err) => showToast(err.error), this.success);
    }
  }
}
</script>

<style scoped>
  .login {
    max-width: 440px;
    width: 100%;
    margin: 0 auto;
  }

  .error {
    width: 100%;
    height: 45px;
    background-color: red;
  }

  .form {
    margin: 20px;
  }
</style>