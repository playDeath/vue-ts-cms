import { DataType, newsDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import { ElMessage } from 'element-plus'
const newsModule: any = {
  namespaced: true,
  state(): newsDataType {
    return {
      newsLists: [],
      total: 0,
      newsList: null,
      createUser: '',
      newsColumn: '',
      newsTitle: '',
      newsType: '',
      current: 1,
      size: 6
    }
  },
  actions: {
    getNewsListsByCondition(context: any): void {
      tableRequest
        .request<DataType>({
          url: `/news/findNewsByPage`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            current: context.state.current,
            limit: context.state.size
          },
          data: {
            createUser: context.state.createUser,
            newsTitle: context.state.newsTitle
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setNewsLists', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    },
    deleteNewsListById(context: any, id: number) {
      commonRequest
        .request<DataType>({
          url: `/news/removeNews/${id}`,
          method: 'DELETE'
        })
        .then((res) => {
          console.log(res)

          if (res.data.status === 200) {
            ElMessage.success('删除成功')
            context.dispatch('getNewsListsByCondition')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('出现一些错误')
          console.log(error)
        })
    },
    getNewsListById(context: any, id: number) {
      commonRequest
        .request<DataType>({
          url: `/news/selectByID/${id}`,
          method: 'GET'
        })
        .then((res) => {
          console.log(res)

          if (res.data.status === 200) {
            context.commit('setNewsList', res.data.data)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('出现一些错误')
          console.log(error)
        })
    },
    addNewsList(context: any, status: number) {
      context.commit('setNewsListNewsType', status)
      commonRequest
        .request<DataType>({
          url: '/news/addNews',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: context.state.newsList
        })
        .then((res) => {
          console.log(res)

          if (res.data.status === 200) {
            ElMessage.success(`发布成功！`)
            context.commit('setNewsList', {})
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    },
    upDateNewsList(context: any) {
      commonRequest
        .request<DataType>({
          url: '/news/updateNews',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: context.state.newsList
        })
        .then((res) => {
          console.log(res)

          if (res.data.status === 200) {
            ElMessage.success(`修改成功！`)
            context.commit('setNewsList', {})
            context.dispatch('getNewsListsByCondition')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    }
  },
  mutations: {
    setNewsLists(state: any, newsLists: any) {
      state.newsLists = newsLists
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setCurrent(state: any, current: number) {
      state.current = current
    },
    setNewsList(state: any, newsList: any) {
      state.newsList = newsList
    },
    setNewsListNewsType(state: any, status: number) {
      state.newsType = status
    },
    setNewsTitle(state: any, title: string) {
      state.newsTitle = title
    },
    setCreateUser(state: any, createUser: string) {
      state.createUser = createUser
    }
  }
}
export default newsModule
