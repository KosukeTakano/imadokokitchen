<template>
  <div class="container">
    <div class="text-center">
      <div>
        <h1>現在の状態</h1>
          <div>
            <GmapMap
              :center="myCordinate"
              :zoom="15"
              :options="{streetViewControl: false}"
              style="width: 100%; height:400px; margin:32px auto;"
            >
              <GmapMarker
                :position="myCordinate"
              />
            </GmapMap>
          </div>
          <div>
            <div>
              <p>
                開店ボタンを押すと、現在地が更新されます。<br>
                閉店ボタンを押すと、現在地は表示されません。
              </p>
            </div>
            <div class="container">
              <button class="btn" type="submit" @click="opencar" style="margin-right:20px;">OPEN</button>
              <button class="btn" type="submit" @click="closecar">CLOSE</button>
            </div>
          </div>
      </div>
      <div>
        <h1>掲載内容</h1>
        <div class="btn-container">
        <section id="menu">
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
        <button class="btn" @click="goToMenu">メニューを編集する</button>
        <section id="infomation">
          <div>
            <div>
              <img id="logoimg" width="200" height="200" alt="ロゴ">
            </div>
            <table class="table table-bordered font-weight-normal">
              <tbody>
                <tr>
                  <th scope="row">店舗名</th>
                  <th scope="row">{{name}}</th>
                </tr>
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
                <tr>
                  <th scope="row">コメント</th>
                  <th scope="row">{{comment}}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <button class="btn" @click="goToEdit">内容を編集する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

export default {
  data () {
    return {
      myCordinate: {
        lat: 0,
        lng: 0
      },
      manymenu: [],
      name: null,
      genre: null,
      open: null,
      close: null,
      days: null,
      budget: null,
      payments: null,
      tel: null,
      comment: null
    }
  },
  created () {
    // ログインIDとfirebase登録されているIDが合っていれば、データを表示
    const uid = firebase.auth().currentUser.uid
    firebase.firestore().collection('kitchencars').doc(uid).get().then(doc => {
      console.log(doc.data())
      this.name = doc.data().name
      this.genre = doc.data().genre
      this.open = doc.data().open
      this.close = doc.data().close
      this.days = doc.data().days
      this.budget = doc.data().budget
      this.payments = doc.data().payments
      this.tel = doc.data().tel
      this.comment = doc.data().comment
    }).then(() => {
      // databaseからメニューを取得
      firebase.database().ref('kitchencars/' + uid + '/menu').on('value', (snapshot) => {
        this.manymenu = snapshot.val()
      })
      // 画像取得
      const storageRef = firebase.storage().ref('kitchencars')
      storageRef.child(uid).getDownloadURL().then((url) => {
        document.getElementById('logoimg').setAttribute('src', url)
      })
    })
    // 現在地取得
    this.$getLocation({})
      .then(cordinates => {
        this.myCordinate = cordinates
      })
      .catch(error => alert(error))
  },
  methods: {
    goToMenu () {
      this.$router.push('/menuedit')
    },
    goToEdit () {
      this.$router.push('/edit')
    },
    // 開店
    opencar () {
      const uid = firebase.auth().currentUser.uid
      firebase.firestore().collection('kitchencars').doc(uid).update({
        myCordinate: this.myCordinate
      })
        .then(() => {
          alert('開店しました！')
        })
    },
    // 閉店
    closecar () {
      const uid = firebase.auth().currentUser.uid
      firebase.firestore().collection('kitchencars').doc(uid).update({
        myCordinate: null
      })
        .then(() => {
          alert('閉店しました！')
        })
    }
  }
}
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
  margin-bottom: 32px;
}
table {
  table-layout: fixed;
}
</style>
