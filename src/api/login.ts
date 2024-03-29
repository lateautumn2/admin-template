import { request } from "@/utils/service"

export interface ILoginData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
}

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request({
    url: "login/code",
    method: "get"
  })
}
/** 登录并返回 Token */
export function loginApi(data: ILoginData) {
  return request({
    url: "users/login",
    method: "post",
    data
  })
}
/** 获取用户详情 */
export function getUserInfoApi() {
  return request({
    url: "users/info",
    method: "post"
  })
}
