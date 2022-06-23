//获取排行榜数据
import { request } from "../network/http";
// 获取全球榜数据
export function getGlobalData(url) {
  return request({
    url: url,
    method: "get",
  });
}
//获取排行榜详细地址数据
export function getUrlData(url, params) {
  return request({
    url,
    params,
  });
}
//获取到榜单中的歌曲详情

export function getSongData(url, params) {
  return request({
    url,
    params,
  });
}
