<template>
  <div>
    <p class="plist">推荐歌单</p>
    <van-row gutter="7">
      <!-- 循环数据铺设页面 -->
      <van-col span="8" v-for="obj in relist" :key="obj.id">
        <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
      <p class="plist">最新Music</p>
      <van-cell
        center
        :title="obj.name"
        :label="obj.song.artists[0].name + ' - ' + obj.name"
        v-for="obj in songlist"
        :key="obj.id"
      >
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem" />
        </template>
      </van-cell>
    </van-row>
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from '@/api' //导入网络请求的api方法
export default {
  data() {
    return {
      relist: [], //推荐音乐
      songlist: [],
    }
  },
  // 网页加载的时候就请求数据
  async created() {
    const res = await recommendMusicAPI({
      // 限制歌曲数量6个
      limit: '6',
    })
    this.relist = res.data.result
    const res1 = await newMusicAPI({
      limit: '20',
    })
    this.songlist = res1.data.result
    // console.log(res1)
  },
}
</script>

<style scoped>
/* 标题 */
.plist {
  font-size: 0.4rem;
}
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
