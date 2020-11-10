<template>
  <div class="container">
  <div>
    <h1 class="text-center">アカウントをお持ちの方はこちら</h1>
    <div id="signin">
    <form @submit.prevent="signIn">
      <div class="form-group">
        <label>メールアドレス：</label>
        <input v-model="email" type="email" class="form-control" placeholder="email@example.com" required>
      </div>
      <div class="form-group">
        <label>パスワード：</label>
        <input v-model="password" type="password" class="form-control" placeholder="example01" required>
      </div>
      <div class="text-center">
        <button type="submit" class="btn">ログイン</button>
      </div>
    </form>
    </div>
  </div>
  <div id="or">
    <h2>または</h2>
    <button type="submit" class="btn" @click="goToSignUp">新規アカウント作成</button>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default ({
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          alert('ログインしました。')
          this.$router.push('/manager')
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            alert('アカウントが存在しません。')
          }
        })
    },
    goToSignUp () {
      this.$router.push('/signup')
    }
  }
})
</script>

<style scoped>
h1 {
  font-size: medium;
  font-weight: bold;
  padding: 16px 0px;
}

button {
  background-color: #ff9922;
  color: #fff8cf;
}

#or {
  text-align: center;
  margin: 32px 0 16px;
}

h2 {
  font-size: medium;
}
</style>
