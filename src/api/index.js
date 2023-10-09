// 统一导出所有的网络请求
import { recommendMusic, newMusic } from './Home'
import { hotSearch, searchResult } from './Search'
export const recommendMusicAPI = recommendMusic //请求推荐歌单的方法
export const newMusicAPI = newMusic //最新音乐
export const hotSearchAPI = hotSearch //热搜关键字
export const searchResultAPI = searchResult //搜索结果
