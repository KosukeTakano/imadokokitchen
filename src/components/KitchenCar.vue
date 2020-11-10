<template>
<div>
  <ul v-for="kitchencar in kitchencars" v-bind:key="kitchencar.id">
      <li class="border">
        {{kitchencar.name}}<br>
        {{kitchencar.genre}}<br>
        {{kitchencar.open}}~{{kitchencar.close}}
        <router-link class="secondary content" v-bind:to="{name:'store', param: {kitchencar_id: kitchencar.kitchencar_id}}">あああ</router-link>
      </li>
  </ul>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  data () {
    return {
      kitchencars: []
    }
  },
  created () {
    firebase.firestore().collection('kitchencars').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          kitchencar_id: doc.data().kitchencar_id,
          name: doc.data().name,
          genre: doc.data().genre,
          open: doc.data().open,
          close: doc.data().close
        }
        console.log(doc.data())
        this.kitchencars.push(data)
      })
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
</style>
