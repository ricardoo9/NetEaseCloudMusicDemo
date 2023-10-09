// 封装基本的网络请求
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/' //设置基地址方便以后管理
export default axios
