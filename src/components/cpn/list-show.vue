<template>
  <hr style="width: 100%; color: #72767b" />
  <div class="list">
    <!-- <header>
      <img
        src="~@/assets/img/avatar.png"
        style="width: 85px; height: 80px; border-radius: 50%"
        class="expand"
      />
    </header> -->
    <div class="lists-show">
      <div
        v-for="(item, index) in passwords"
        :key="item.props"
        class="list-show"
      >
        <div class="list-show-item">
          <span>{{ item.props }}:</span>
          <input
            type="password"
            v-model="item.password"
            class="list-input"
            v-focus="index"
          />
        </div>
      </div>
      <footer>
        <el-button
          type="primary"
          size="medium"
          class="el-icon-edit"
          @click="editMyPassword"
        ></el-button>
        <el-button
          type="primary"
          size="medium"
          class="el-icon-right"
          @click="changeStatus"
        ></el-button>
      </footer>
    </div>
  </div>
  <!-- <div v>暂无数据</div> -->
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import type { DataType } from '@/store/home/type'
import { commonRequest } from '@/network/index'
import { ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'
export default defineComponent({
  name: '',
  directives: {
    focus: {
      mounted(el, bindings) {
        if (bindings.value === 0) {
          el.focus()
        }
      }
    }
  },
  setup(props, { emit }) {
    const passwords = reactive([
      {
        props: '旧密码',
        password: ''
      },
      {
        props: '新密码',
        password: ''
      },
      {
        props: '确认密码',
        password: ''
      }
    ])
    const personData = inject('personData')
    const changeStatus = () => {
      emit('changeStatus')
    }
    const editMyPassword = () => {
      if (
        passwords[0].password === '' ||
        passwords[1].password === '' ||
        passwords[2].password === ''
      ) {
        ElNotification({
          title: '错误',
          message: '密码不能为空',
          type: 'error',
          duration: 1000
        })
      } else {
        if (passwords[1].password !== passwords[2].password) {
          ElNotification({
            title: '错误',
            message: '密码不一致',
            type: 'error',
            duration: 1000
          })
        } else {
          const data = {
            oldPassword: passwords[0].password,
            newPassword: passwords[1].password,
            confirmPassword: passwords[2].password
          }
          commonRequest
            .request<DataType>({
              url: '/tUser/changePassword',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              params: data
            })
            .then((res) => {
              console.log(res)
              if (res.data.status === 200) {
                ElNotification({
                  title: '成功',
                  message: '修改密码成功',
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
      }
    }
    return {
      changeStatus,
      personData,
      passwords,
      editMyPassword
    }
  }
})
</script>
<style scoped lang="less">
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25rem;
  width: 100%;
  color: #91969b;
  .lists-show {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 10rem;
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
