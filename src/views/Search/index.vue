<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      shape="round"
      v-model="value"
      @input="inputFn"
      placeholder="请输入搜索关键词"
    />
    <!-- 添加v-if互斥显示结果根据搜索结果的长度判断 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <!--搜索候选项 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配曲目</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          center
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.name"
          v-for="obj in resultList"
          :key="obj.id"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem" />
          </template> </van-cell
      ></van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultAPI } from '@/api'
export default {
  data() {
    return {
      value: '',
      //  热搜数据
      hotArr: [],
      //   搜索数据
      resultList: [],
      loading: false, //加载中的状态，为false出发自动加载方法
      finished: false, //未加载全部，true,底部不会在执行onload
      page: 1, //页码
      timer: null, //防抖
    }
  },
  //   调用接口拿到数据
  async created() {
    const res = await hotSearchAPI({})
    this.hotArr = res.data.result.hots
    // console.log(res)
  },

  methods: {
    // 获取搜索数据
    async getListFn() {
      return await searchResultAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      })
    },
    // 点击搜索关键词
    async fn(val) {
      this.page = 1 //点击重新获取第一页的数据
      this.finished = false //点击新的关键词可能有新的数据
      this.value = val
      //   获取请求的数据赋值
      const res = await this.getListFn()
      //   console.log(res.data.result.songs)
      this.resultList = res.data.result.songs
      // console.log(this.resultList)
      this.loading = false //本次加载完成
    },
    // 输入框值改变
    async inputFn() {
      // 使用防抖优化代码
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.page = 1 //点击重新获取第一页的数据
        this.finished = false //点击新的关键词可能有新的数据
        // 输入框为空,清空搜索内容
        if (this.value.length === 0) {
          this.resultList = []
          return
        }
        const res = await this.getListFn()
        //   没有请求数据
        if (res.data.result.songs === undefined) {
          this.resultList = []
          return
        }
        //   console.log(res.data.result.songs)
        this.resultList = res.data.result.songs
        this.loading = false //本次加载完成
      }, 900)
    },
    // 加载下一页方法
    async onLoad() {
      // 触底页码加1
      this.page++
      const res = await this.getListFn()
      //   没有请求数据,不往下加载
      if (res.data.result.songs === undefined) {
        this.finished = true
        this.loading = false //本次加载完成
        return
      }
      this.resultList = [...this.resultList, ...res.data.result.songs]
      this.loading = false //数据加载完毕保证下一次能加载
    },
  },
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
