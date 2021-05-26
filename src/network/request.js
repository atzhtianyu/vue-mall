import axios from "axios";

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // 这里的baseURL是老师提供的，具体请看下方视频中的第一条评论
    // https://www.bilibili.com/video/BV15741177Eh
    baseURL: 'xxxxxx',
    timeout: 5000
  });

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  });

  return instance(config);
}
