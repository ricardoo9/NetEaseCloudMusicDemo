<template>
  <div>
    <van-nav-bar :title="activeTitle" fixed />
    <!-- 二级路由的挂载点 -->
    <div class="main">
      <router-view></router-view>
    </div>

    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title, //默认头部获取点击对象的名称
    }
  },
  //   侦听路由对象的改变，并修改值
  watch: {
    $route() {
      this.activeTitle = this.$route.meta.title //提取切换后路由信息对象的名称
    },
  },
}
</script>

<style scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
