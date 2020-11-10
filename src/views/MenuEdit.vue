<!--最終的にmanagerに表示するかも-->
<template>
  <div class="container">
    <h1 class="text-center">メニューの登録</h1>
      <section id="addmenu">
        <div id="overlay" v-show="showModal" @click="closeModal">
          <div id="content" @click="stopEvent">
            <button id="closeModal" @click="closeModal">×</button>
            <div id="addMenutitle">追加メニュー</div>
              <form class="from container" method="post" name="menuform">
                <label for="productname">商品名</label>
                <input id="productname" v-model="menu.name" type="text" class="form-control" placeholder="コーヒー、おにぎりetc...">
                <label for="price">価格</label>
                <input id="price" v-model="menu.price" type="text" class="form-control" placeholder="300">
              </form>
              <div class="container text-center"><button id="addMenu" type="submit" class="btn" @click="addMenu">登録</button></div>
          </div>
        </div>
      </section>
      <section id="nowmenu">
        <h2>現在のメニュー</h2>
        <table>
          <tbody>
            <tr v-for="(menu, key) in manymenu" :key="key">
              <td>{{menu.name}}</td>
              <td>¥{{menu.price}}</td>
              <td id="delete"><button type="submit" @click="deleteMenu(key)">削除</button></td>
            </tr>
          </tbody>
        </table>
      </section>
      <div id="btn">
        <button id="cancel" type="submit" class="btn" @click="goToManager">キャンセル</button>
        <button id="register" type="submit" class="btn" @click="openModal">追加</button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  data () {
    return {
      showModal: false,
      manymenu: [],
      menu: {
        name: null,
        price: null
      }
    }
  },
  created () {
    const uid = firebase.auth().currentUser.uid
    firebase.database().ref('kitchencars/' + uid + '/menu').on('value', (snapshot) => {
      this.manymenu = snapshot.val()
    })
  },
  methods: {
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    stopEvent () {
      event.stopPropagation()
    },
    addMenu () {
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref('kitchencars/' + uid + '/menu').push({
        name: this.menu.name,
        price: this.menu.price
      })
        .then(() => {
          document.menuform.reset()
        })
    },
    deleteMenu (key) {
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref('kitchencars/' + uid + '/menu').child(key).remove()
    },
    goToManager () {
      this.$router.push('/manager')
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
h2 {
  font-size: medium;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}
#addMenutitle {
  font-size: medium;
  font-weight: bold;
  text-align: center;
  padding: 16px 0px 0px 22px;
}
#overlay {
  /* 画面を重ねたときの順番 */
  z-index: 1;
  /* 画面全体を覆う設定 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 画面の中央に要素を表示する設定 */
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 80%;
  height: 30%;
  background: #fff;
}
label {
  margin-bottom: 2px;
}
input {
  margin-bottom: 10px;
}
#content {
  background-color: #fff5e9;
  border-style: solid;
  border-color: #a8600d;
}
#btn{
  margin-top: 32px;
  text-align: center;
}
#register{
  background-color: #ff9922;
  color: #fff8cf;
  padding: 6px 48px;
}
#addMenu {
  background-color: #ff9922;
  color: #fff8cf;
  padding: 6px 48px;
  text-align: center;
}
#closeModal {
  border: none;
  outline: none;
  background: transparent;
  position: relative;
  float: right;
}
table {
  table-layout: fixed;
  width: 100%;
}
tr {
  height: 40px;
  border-bottom: 1px solid;
}
#delete {
  text-align: left;
  width: 60px;
}
#delete > button {
  background-color: #ff4b4b;
  color: #fff8cf;
  border: none;
}
#cancel {
  background-color: #808080;
  color: #fff8cf;
  margin-right: 30px;
}
</style>
