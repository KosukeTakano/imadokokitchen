<template>
  <div class="container">
    <h1 class="text-center">新規アカウント作成</h1>
    <div id="signup">
      <form @submit.prevent="signUp">
        <div class="form-group">
          <label>メールアドレス：</label>
          <input v-model="email" type="email" class="form-control" placeholder="email@example.com" required>
        </div>
        <div class="form-group">
          <label>パスワード：</label>
          <input v-model="password" type="password" class="form-control" placeholder="example01" required>
        </div>
        <div class="text-center">
          <button type="submit" class="btn">登録</button>
        </div>
      </form>
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
    signUp () {
      const user = firebase.auth()
      user.createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          user.currentUser.sendEmailVerification(this.mail)
          alert('アカウントを作成しました。')
          this.$router.push('/newreg')
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            alert('アカウントが存在しません。')
          }
        })
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
  margin-bottom: 30px;
}
#infomation {
  text-align: center;
}
</style>
