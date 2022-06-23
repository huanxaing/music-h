import axios from "axios"; //引入

//2创建方法 request  暴露出去
export function request(config) {
  //3创建axios实例
  var instance = axios.create({
    baseURL: "/api",
    timeout: 50000,
  });

  // 添加拦截器
  //响应拦截器
  instance.interceptors.response.use(
    function(response) {
      // 对响应数据做点什么
      return response.data;
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  //请求
  return instance(config);
}
