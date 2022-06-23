// 歌单列表
import { request } from "../network/http";
//获取歌单分类数据
export function getClassData(url) {
  return request({
    url: url,
    method: "get",
  });
}
//获取歌单列表数据
export function getSongData(url, params) {
  return request({
    url,
    params,
  });
}
