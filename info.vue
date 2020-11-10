<template>
  <div class="container">
  <div>
    <h1 class="text-center">新規登録・ログイン</h1>
    <div id="signup">
      <form @submit.prevent="signUp">
        <div class="form-group">
          <label>メールアドレス：</label>
          <input v-model="email" type="email" class="form-control" placeholder="email@example.com" required>
        </div>
        <p v-if="sendURL">URLをお送りいたしました</p>
        <div class="btn-container text-center">
          <button type="submit" class="btn">送信</button>
        </div>
      </form>
    </div>
    <div id="infomation">
      <p>
        送信されたメールアドレスにURLをお送りいたします。 <br>
        登録済みの方は、マイページに移ります。<br>
        新規の方は、登録ページに移ります。
      </p>
    </div>
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
      error: '',
      sendURL: false
    }
  },
  created () {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation')
      }
      // The client SDK will parse the code from the link for you.
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn')
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          if (result.additionalUserInfo.isNewUser) {
            alert('新規登録を行います')
            this.$router.push('/newreg')
          } else {
            alert('ログインします')
            this.$router.push('/manager')
          }
        })
        .catch(error => alert(error))
    }
  },
  methods: {
    signUp () {
      var actionCodeSettings = {
        url: 'https://www.takano01.sakura.ne.jp/manager',
        handleCodeInApp: true
      }
      firebase.auth().sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', this.email)
          this.sendURL = true
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
