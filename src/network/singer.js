// 歌手
import { request } from "../network/http";
//获取歌手数据
export function getSingerData(url, params) {
  return request({
    url: url,
    params,
    method: "get",
  });
}
