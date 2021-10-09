<template>
  <div>
    <!-- <login /> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import login from '@/views/login/login.vue'
// import home from '@/views/home/home.vue'

export default defineComponent({
  name: 'App',
  components: {
    // home
    // login
  }
})
</script>
<style lang="less"></style>
