import { request } from "@/utils/service"

export function getChart(params?: any) {
  return request({
    url: "/api/chartList",
    method: "get",
    params
  })
}
