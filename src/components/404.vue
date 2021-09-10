<template>
  <div>
    <el-empty description="啥子都没有呢，亲~~" :image-size="300">
      <el-button type="primary" @click="backTo">返回</el-button>
    </el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '',
  setup() {
    const router = useRouter()
    const backTo = () => {
      router.go(-1)
    }
    return {
      backTo
    }
  }
})
</script>
<style scoped lang="less">
.tip {
  color: #40b681;
}
</style>
