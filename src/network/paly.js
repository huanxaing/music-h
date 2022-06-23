// 底部播放功能
import { request } from "../network/http";

//获取歌曲播放地址
export function getSongUrl(url, params) {
  return request({
    url: url,
    params,
    method: "get",
  });
}
//获取歌曲详情
export function getSongDetail(url, params) {
  return request({
    url: url,
    params,
    method: "get",
  });
}
