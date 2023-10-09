import request from '@/utils/request'
// 封装请求
// 推荐歌单
export const recommendMusic = (params) =>
  request({
    url: '/personalized',
    params, //传入的是limit值，歌曲的数量，此处用形参代替
  })

//   最新音乐
export const newMusic = (params) =>
  request({
    url: '/personalized/newsong',
    params,
  })
