// 主播电台
import { request } from "../network/http";
//获取轮播图数据
export function getLunbo(url) {
  return request({
    url: url,
    method: "get",
  });
}
// 获取电台分类数据
export function getClass(url) {
  return request({
    url: url,
    method: "get",
  });
}
//个性推荐数据
export function getGexin(url) {
  return request({
    url: url,
    method: "get",
  });
}
// 翻唱
export function getCove(url, params) {
  return request({
    url: url,
    params,
    method: "get",
  });
}
// // 电子3D
// export function get3D(url, params) {
//   return request({
//     url: url,
//     params,
//     method: "get",
//   });
// }
// // 音乐故事
// export function getStory(url, params) {
//   return request({
//     url: url,
//     params,
//     method: "get",
//   });
// }
