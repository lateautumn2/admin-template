import { request } from "@/utils/service"

//node接口
export function addList(data) {
  return request({
    url: "http://localhost:3000/",
    method: "post",
    data
  })
}
