<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div>
      <router-view></router-view>
    </div>
    <transition name="fade">
      <div id="pagetop" v-show="scY>300" @click="toTop">
        <a href="#" class="back-to-top">▲</a>
      </div>
    </transition>
    <footer>
      <AppFooter></AppFooter>
    </footer>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      scTimer: 0,
      scY: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 600)
    },
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
footer {
  margin-top: auto;
}
.back-to-top {
  position: fixed;
  bottom: 55px;
  right: 20px;

  width: 40px;
  height: 40px;

  background-color: #f0f0f0;
  color: #333;
  opacity: 0.6;

  font-size: 1.6rem;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
}
.back-to-top:hover {
  opacity: 1;
  text-decoration: none;
}
</style>
