<template>
  <div class="list">
    <hr style="width: 90%; color: #72767b" />
    <header>
      <img
        src="~@/assets/img/avatar.png"
        style="width: 75px; height: 70px; border-radius: 50%"
        class="expand"
        @click="changeInfo"
      />
    </header>

    <div class="lists-show">
      <div v-for="item in personData" :key="item[1]" class="list-show">
        <div class="list-show-item">
          <span>{{ item[1] }}:</span
          ><input
            type="text"
            v-model="item[0]"
            class="list-input"
            v-if="item[2]"
          /><span v-else>{{ item[0] }}</span>
        </div>
      </div>
    </div>

    <footer>
      <el-button type="primary" size="medium" @click="editMyInfo"
        >提交</el-button
      >
      <el-button type="primary" size="medium" @click="changeStatus"
        >修改密码</el-button
      >
    </footer>
  </div>
  <!-- <div v-else>暂无数据</div> -->
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { DataType } from '@/store/home/type'
import { arrayToObject } from '@/utils/data-transfer'
import { commonRequest } from '@/network/index'
import { ElNotification } from 'element-plus'
export default defineComponent({
  name: '',
  setup(props, { emit }) {
    const personData: any = inject('personData')
    const changeStatus = () => {
      emit('changeStatus')
    }
    const editMyInfo = () => {
      let res = arrayToObject(personData.value)
      commonRequest
        .request<DataType>({
          url: '/tUser/updateInfor',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          params: res
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElNotification({
              title: '成功',
              message: '修改用户信息成功',
              type: 'success',
              duration: 1000
            })
          } else {
            ElNotification({
              title: 'system',
              message: '系统异常',
              type: 'error',
              duration: 1000
            })
          }
        })
        .catch(() => {
          ElNotification({
            title: 'network',
            message: '网络异常',
            type: 'error',
            duration: 1000
          })
        })
    }
    return {
      status,
      changeStatus,
      personData,
      editMyInfo
    }
  }
})
</script>
<style scoped lang="less">
.list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 35rem;
  width: 100%;
  color: #91969b;
  .lists-show {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 26rem;
    .list-show {
      width: 80%;
      flex: 1;
      .list-show-item {
        display: flex;
        .list-input {
          flex: 3;
          border: none;
          border-bottom: 1px solid #72767b;
          text-decoration: none;
          color: #91969b;
          font-size: 1rem;
          line-height: 1rem;
        }
        .list-input:focus {
          outline: none;
        }
        span:nth-child(1) {
          flex: 1;
          font-weight: 600;
        }
        span:nth-child(2) {
          flex: 3;
          border-bottom: 1px solid #72767b;
          font-weight: 500;
        }
      }
    }
  }
}
.expand {
  transition: all 100ms ease-in;
}
.expand:hover {
  transform: scale(1.1);
}
</style>
