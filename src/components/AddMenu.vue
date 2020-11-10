<template>
  <div id="overlay" @click="clickEvent" v-show="showModal">
    <div id="content">
      <h2>追加項目</h2>
      <form class="from-form" method="post">
        <label for="productname">商品名</label>
        <input id="productname" v-model="menu.name" type="text" class="form-control" placeholder="コーヒー、おにぎりetc...">
        <label for="price">価格</label>
        <input id="price" v-model="menu.price" type="text" class="form-control" placeholder="300">
      </form>
      <button id="add" type="submit" class="btn" @click="addMenu">+</button>
      <button @click="clickEvent">close</button>
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
      menu: {
        name: null,
        price: null
      }
    }
  },
  methods: {
    clickEvent () {
      this.showModal = true
    },
    addMenu () {
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref('kitchencars/' + uid + '/menu').push({
        name: this.menu.name,
        price: this.menu.price
      })
    }
  }
}
</script>

<style scoped>
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
</style>
