<template>
  <!--navbar-expand-lgウィンドウ幅992px未満だとナビゲーションアイコンを表示。-->
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand font-weight-bold" href="/">イマドコキッチン</a>
    <!--ハンバーガーメニュー-->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!--data-toggle="collapse" data-target=".navbar-collapse.show"これで他のページに移った時、ハンバーガーメニューを閉じる-->
    <div class="collapse navbar-collapse" id="navbarSupportedContent" data-toggle="collapse" data-target=".navbar-collapse.show">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">ホーム<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            事業者の方
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" id="dropdown">
            <a v-if="isSignin" class="dropdown-item disabled">{{ currentUser }}</a>
            <a v-if="!isSignin" class="dropdown-item" href="/signup">ログイン</a>
            <a v-if="isSignin" class="dropdown-item" @click="signOut">ログアウト</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'AppHeader',
  data () {
    return {
      isSignin: false,
      currentUser: false
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.isSignin = true
      this.currentUser = firebase.auth().currentUser.mail
    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        this.$router.push('/#')
      }).catch(error => alert(error))
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #eec683;
  color: #333333;
}
#dropdown {
  cursor: pointer
}
button {
  margin: 0px;
}
</style>
