<template>
  <div>
    <h1>home2</h1>
    <h2>{{ $store.state.count }}</h2>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'home',
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
