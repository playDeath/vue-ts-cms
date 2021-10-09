<template>
  <el-form :model="newsList" size="mini">
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
        <el-form-item label="新闻标题:">
          <el-input v-model="newsList.newsTitle"></el-input> </el-form-item
      ></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
        <el-form-item label="发布人:">
          <el-input v-model="newsList.createUser"></el-input> </el-form-item
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
        <el-form-item label="操作日期:">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="newsList.createDate"
            value-format="YYYY-MM-DDTHH:MM:ss"
          >
          </el-date-picker></el-form-item
      ></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item label="新闻内容:">
          <el-input
            type="textarea"
            v-model="newsList.newsContent"
          ></el-input> </el-form-item
      ></el-col>
    </el-row>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="footer">
      <el-button type="primary" @click="addNewsList(0)" class="el-btn-distant"
        >发布</el-button
      >
    </el-col>
  </el-form>
  <div class="footer"></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  coalTypes,
  TwoLevelCoalClass,
  transports,
  settlement
} from '../config/data'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const newsList = computed(() => store.state.newsModule.newsList)
    const addNewsList = (status: number): void => {
      store.dispatch('newsModule/addNewsList', status)
    }
    return {
      coalTypes,
      TwoLevelCoalClass,
      transports,
      settlement,
      newsList,
      addNewsList
    }
  }
})
</script>
<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
</style>
