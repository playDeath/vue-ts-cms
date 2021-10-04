<template>
  <el-descriptions
    :column="column"
    border
    v-if="info.length !== 0"
    :size="size"
  >
    <el-descriptions-item
      :label="item[0]"
      v-for="item in info"
      :key="item[0]"
      >{{ item[1] }}</el-descriptions-item
    >
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    info: {
      type: Array,
      default() {
        return []
      }
    },
    column: {
      type: Number,
      default: 2
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less"></style>
