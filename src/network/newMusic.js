import { request } from "../network/http";

//获取最新音乐数据 音乐速递
export function getNewMusic(url, params) {
  return request({
    url,
    params,
  });
}
////获取最新音乐数据 新歌上架
export function getGrounding(url, params) {
  return request({
    url,
    params,
  });
}
