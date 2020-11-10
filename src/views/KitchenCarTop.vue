<template>
  <div class="text-center">
      <img :src="imgPath" alt="メインビジュアル" id="mainvisual">
      <img :src="imgPathXS" alt="メインビジュアル" id="mainvisualXS">
      <div class="container">
        <div>
          <button class="btn" @click="goToSearch">キッチンカーを検索</button>
        </div>
        <div>
          <h1>キッチンカーご紹介</h1>
          <div class="catalog">
            <div class="row" v-for="kitchencar in Math.ceil(kitchencars.length / 2)" :key="kitchencar.id">
            <ul v-for="kitchencar in kitchencars.slice((kitchencar - 1) * 2, kitchencar * 2)" :key="kitchencar.id" class="list-group flex-fill">
              <router-link class="secondarycontent" :to="{name:'store', params: {id: kitchencar.id}}">
                <li class="list-group-item col-lg-10 offset-lg-1 flex-fill list-group-item-action">
                <table>
                  <tr>
                    <td><img :src="kitchencar.url" width="10%" height="10%" alt="ロゴ" id="logoimg"></td>
                    <td id="kitchencarinfo" style="text-align:left;">
                      <p class="kitchencarname">{{kitchencar.name}}</p>
                      <p>ジャンル：{{kitchencar.genre}}</p>
                      <p>営業時間：{{kitchencar.open}}~{{kitchencar.close}}</p>
                    </td>
                  </tr>
                </table>
                </li>
              </router-link>
            </ul>
            </div>
          </div>
        </div>
        <div id="manager">
        <h1>キッチンカー事業者の方へ</h1>
        <p class="mt-3">
          本サイトに登録すると<br>
          リアルタイムで販売場所を表示することができます。</p>
        <p>
          また、営業日時やメニューなどの<br>
          詳細な情報を無料で発信することができます。</p>
        <div>
        <button class="btn" @click="goToSignIn">新規登録・ログイン</button>
        </div>
    </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  data () {
    return {
      imgPath: require('../assets/imadokokitchenheader.png'),
      imgPathXS: require('../assets/imadokokitchenheader-xs.png'),
      kitchencars: []
    }
  },
  created () {
    firebase.auth().signInAnonymously().catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, '', errorMessage)
    })
    firebase.firestore().collection('kitchencars').limit(4).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          name: doc.data().name,
          genre: doc.data().genre,
          open: doc.data().open,
          close: doc.data().close,
          url: doc.data().url
        }
        this.kitchencars.push(data)
      })
    })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    goToSearch () {
      this.$router.push('/search')
    },
    goToSignIn () {
      this.$router.push('/signin')
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
  margin-top: 32px;
  margin-bottom: 32px;
}
#mainvisual {
  width: 100%;
  height: 30%;
}
#mainvisualXS {
  width: 100%;
  height: 80%;
}
#logoimg {
  width: 200px;
  height: 200px;
}
@media screen and (min-width: 571px) {
  #mainvisualXS{
    display: none;
    }
}
@media screen and (max-width: 570px) {
  #mainvisual{
    display: none;
    }
}
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
li {
  margin-top: 16px;
}
.kitchencarname {
  font-size: 20px;
}
table {
  text-align: center;
}
.secondarycontent {
  text-decoration: none;
}
table {
  text-align: center;
}
#kitchencarinfo {
  text-align: left;
  padding-left: 30px;
}
</style>
