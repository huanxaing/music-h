import { request } from "../network/http";

//获取轮播图数据
export function getLunbo(url) {
  return request({
    url: url,
    method: "get",
  });
}
//获取推荐歌单数据
export function getRecommend(url, params) {
  return request({
    url,
    params,
  });
}
//获取独家放送数据
export function getSole(url) {
  return request({
    url,
  });
}
//获取最新音乐数据
export function getNewMusic(url) {
  return request({
    url,
  });
}

// 获取用户名称 /test3 get
// export function getName(url, params) {
//   return request({
//     url: url,
//     method: "get",
//     params: params,
//   });
// }

// //post
// export function getObj(url, params) {
//   return request({
//     url: url,
//     method: "post",
//     data: params,
//   });
// }
