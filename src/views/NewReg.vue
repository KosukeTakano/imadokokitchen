<template>
  <div  class="container">
    <h1 class="text-center">掲載内容の登録</h1>
    <div>
      <form @submit.prevent="newregister">
        <!--Name-->
          <div class="form-group">
            <label for="name">店舗名 <span class="badge badge-danger">必須</span></label>
            <input id="name" v-model="name" type="text" class="form-control" placeholder="店舗名" required>
          </div>
        <!--Tel-->
          <div class="form-group">
            <label for="tel">電話番号 <span class="badge badge-danger">必須</span></label>
            <input id="tel" v-model="tel" type="text" class="form-control" placeholder="○○○-×××-△△△" required>
          </div>
        <!--Genre-->
          <div class="form-group">
            <label for="genre">ジャンル <span class="badge badge-danger">必須</span></label>
            <select id="genre" v-model="genre" class="form-control" required>
              <option value="" checked>選択してください</option>
              <option>ドリンク</option>
              <option>カレーライス</option>
              <option>オムライス</option>
              <option>その他</option>
            </select>
          </div>
        <!--Time-->
          <div class="form-group">
            <label for="time">営業時間 <span class="badge badge-danger">必須</span></label>
            <div class="flex-container">
            <select id="open" v-model="open" class="form-control" required>
              <option value="" checked>選択してください</option>
              <option>0:00</option>
              <option>1:00</option>
              <option>2:00</option>
              <option>3:00</option>
              <option>4:00</option>
              <option>5:00</option>
              <option>6:00</option>
              <option>7:00</option>
              <option>8:00</option>
              <option>9:00</option>
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
              <option>19:00</option>
              <option>20:00</option>
              <option>21:00</option>
              <option>22:00</option>
              <option>23:00</option>
              <option>24:00</option>
            </select>
            <div>〜</div>
            <select id="close" v-model="close" class="form-control" required>
              <option value="" checked>選択してください</option>
              <option>0:00</option>
              <option>1:00</option>
              <option>2:00</option>
              <option>3:00</option>
              <option>4:00</option>
              <option>5:00</option>
              <option>6:00</option>
              <option>7:00</option>
              <option>8:00</option>
              <option>9:00</option>
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
              <option>19:00</option>
              <option>20:00</option>
              <option>21:00</option>
              <option>22:00</option>
              <option>23:00</option>
              <option>24:00</option>
            </select>
            </div>
          </div>
        <!--Day-->
          <div class="form-group">
           <label class="control-label">定休日</label>
           <div id="days">
             <input type="checkbox" id="mon" value="月曜日" v-model="days" name="day"><label for="mon">月</label>
             <input type="checkbox" id="tue" value="火曜日" v-model="days" name="day"><label for="tue">火</label>
             <input type="checkbox" id="wed" value="水曜日" v-model="days" name="day"><label for="wed">水</label>
             <input type="checkbox" id="thu" value="木曜日" v-model="days" name="day"><label for="thu">木</label>
             <input type="checkbox" id="fri" value="金曜日" v-model="days" name="day"><label for="fri">金</label>
             <input type="checkbox" id="sat" value="土曜日" v-model="days" name="day"><label for="sat">土</label>
             <input type="checkbox" id="sun" value="日曜日" v-model="days" name="day"><label for="sun">日</label>
           </div>
          </div>
        <!--Budget-->
          <div class="form-group">
            <label for="budget">予算 <span class="badge badge-danger">必須</span></label>
            <select id="budget" v-model="budget" class="form-control" required>
              <option value="" checked>-</option>
              <option>500円</option>
              <option>1000円</option>
              <option>1500円</option>
              <option>2000円</option>
            </select>
          </div>
        <!--Pay-->
          <div class="form-group">
           <label class="control-label">決済方法</label>
           <div id="payments">
             <input type="checkbox" id="money" value="現金" v-model="payments" name="pay"><label for="money">現金</label>
             <input type="checkbox" id="card" value="クレジットカード" v-model="payments" name="pay"><label for="card">クレジットカード</label>
             <input type="checkbox" id="ele" value="電子マネー" v-model="payments" name="pay"><label for="ele">電子マネー</label>
           </div>
          </div>
        <!--Comment-->
          <div class="form-group">
            <label for="comment">店舗の紹介文 <span class="badge badge-danger">必須</span></label>
            <textarea id="comment" v-model="comment" type="text" rows="5" cols="50" wrap="hard" class="form-control" placeholder="お店からのコメント" required></textarea>
          </div>
        <!--Logo-->
          <div class="form-group">
            <label for="file">ロゴ <span class="badge badge-danger">必須</span></label>
            <input @change="selectFile" id="file" type="file" class="form-control-file" accept="image/jpeg,image/png,image/gif">
            <img id="logoimg-preview" width="100" height="100" alt="ロゴ">
          </div>
      <div id="btn">
        <button id="cancel" type="submit" class="btn" @click="goToHome">キャンセル</button>
        <button id="newregister" type="submit" class="btn">新規登録</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export default {
  data () {
    return {
      name: null,
      tel: null,
      genre: null,
      open: null,
      close: null,
      days: [],
      budget: null,
      payments: [],
      comment: null,
      file: null
    }
  },
  methods: {
    selectFile (e) {
      const input = e.target
      const { files } = input
      if (files.length === 0) {
        return
      }
      const file = files[0]
      const metadata = {
        contentType: file.type
      }
      const uid = firebase.auth().currentUser.uid
      const storageRef = firebase.storage().ref('kitchencars').child(uid)
      // 変更した画像をstorageにアップロード
      storageRef.put(file, metadata).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          // 変更した画像を表示
          document.getElementById('logoimg-preview').setAttribute('src', url)
          firebase.firestore().collection('kitchencars').doc(uid).set({
            url
          })
        })
      }).catch((error) => {
        console.error('プロフィール画像のアップロードに失敗:', error)
      })
    },
    newregister () {
      firebase.auth().onAuthStateChanged(() => {
        const uid = firebase.auth().currentUser.uid
        firebase.firestore().collection('kitchencars').doc(uid).update({
          name: this.name,
          tel: this.tel,
          genre: this.genre,
          open: this.open,
          close: this.close,
          days: this.days,
          budget: this.budget,
          payments: this.payments,
          comment: this.comment
        })
          .then(() => {
            alert('登録しました！')
            this.$router.push('/manager')
          })
          .catch(error => {
            alert(error.message)
          })
      })
    },
    goToHome () {
      this.$router.push('/')
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
#btn {
  text-align: center;
}
button {
  margin: 0px 10px 32px 10px;
}
#newregister {
  background-color: #ff9922;
  color: #fff8cf;
  padding: 6px 48px;
}
#cancel {
  background-color: #808080;
  color: #fff8cf;
}
textarea {
  height: calc( 1.3em * 5 );
  line-height: 1.3;
}
#days label {
  margin: 0px 10px 0px 3px;
}
#payments label {
  margin: 0px 10px 0px 3px;
}
</style>
