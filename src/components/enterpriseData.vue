<template>
  <div class="line">
    <hr style="color: #72767b; width: 90%" />
  </div>
  <div class="list">
    <div class="lists-show">
      <div v-for="item in enterpriseData" :key="item[1]" class="list-show">
        <div class="list-show-item">
          <span>{{ item[1] }}:</span><span>{{ item[0] }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-else>暂无数据</div> -->
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
export default defineComponent({
  name: '',
  props: {
    enterpriseData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props: any) {
    nextTick(() => {
      console.log(props.enterpriseData)
    })
    return {}
  }
})
</script>
<style scoped lang="less">
.line {
  width: 100%;
  display: flex;
  justify-content: center;
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  width: 100%;
  color: #91969b;
  .lists-show {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 12rem;
    .list-show {
      width: 80%;
      flex: 1;
      .list-show-item {
        display: flex;
        span:nth-child(1) {
          flex: 2;
          font-weight: 600;
        }
        span:nth-child(2) {
          flex: 4;
          border-bottom: 1px solid #72767b;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
