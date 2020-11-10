<template>
  <div class="text-center container">
  <section>
    <h1>{{name}}</h1>
    <div>
      <img :src="imageURL" width="200" height="200" alt="ロゴ">
    </div>
    <p>
      {{comment}}
    </p>
  </section>
  <section id="menu">
    <h2 class="text-center">メニュー</h2>
    <div>
      <table class="table table-bordered font-weight-normal">
        <thead>
          <tr>
            <th>商品名</th>
            <th>価格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(menu, key) in manymenu" :key="key">
            <th>{{menu.name}}</th>
            <th>¥{{menu.price}}-</th>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section id="infomation">
    <h2 class="text-center">基本情報</h2>
    <div>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th scope="row">ジャンル</th>
            <th scope="row">{{genre}}</th>
          </tr>
          <tr>
            <th scope="row">営業時間</th>
            <th scope="row">{{open}}~{{close}}</th>
          </tr>
          <tr>
            <th scope="row">定休日</th>
            <th scope="row">
              <div v-for="day in days" :key="day">{{day}}</div>
            </th>
          </tr>
          <tr>
            <th scope="row">平均予算</th>
            <th scope="row">{{budget}}</th>
          </tr>
          <tr>
            <th scope="row">決済方法</th>
            <th scope="row">
              <div v-for="payment in payments" :key="payment">{{payment}}</div>
            </th>
          </tr>
          <tr>
            <th scope="row">お問い合わせ</th>
            <th scope="row">{{tel}}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
// import 'firebase/auth'
import 'firebase/firestore'

export default {
  data () {
    return {
      manymenu: [],
      name: null,
      genre: null,
      open: null,
      close: null,
      days: [],
      budget: null,
      payments: [],
      tel: null,
      imageURL: null,
      comment: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData () {
      const currentId = this.$route.params.id
      firebase.firestore().collection('kitchencars').doc(currentId).get().then((doc) => {
        this.name = doc.data().name
        this.genre = doc.data().genre
        this.open = doc.data().open
        this.close = doc.data().close
        this.days = doc.data().days
        this.budget = doc.data().budget
        this.payments = doc.data().payments
        this.comment = doc.data().comment
        this.tel = doc.data().tel
        this.imageURL = doc.data().url
      })
        .then(() => {
          firebase.database().ref('kitchencars/' + currentId + '/menu').on('value', (snapshot) => {
            this.manymenu = snapshot.val()
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 25px;
  font-weight: bold;
  padding: 20px 0px 16px 0px;
}
h2 {
  font-size: medium;
  padding: 16px 0px;
}
table {
  table-layout: fixed;
}
</style>>
