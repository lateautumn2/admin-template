import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElMessage } from "element-plus"
import { get } from "lodash-es"
import { getToken } from "@/utils/cache/cookies"

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 API 返回的数据
      const apiData = response.data as any
      // 这个 Code 是和后端约定的业务 Code
      const code = apiData.code
      // 如果没有 Code, 代表这不是项目后端开发的 API
      if (code === undefined) {
        ElMessage.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      } else {
        if (code !== 200) {
          apiData.msg = switchErr(code, apiData.msg)
          return Promise.reject(new Error(apiData.msg))
        } else {
          return apiData
        }
      }
    },
    (error) => {
      // Status 是 HTTP 状态码
      const status = get(error, "response.status")
      error.msg = switchErr(status, error.msg)
      return Promise.reject(error)
    }
  )
  return service
}

const switchErr = (status: number, msg: string) => {
  let message = "请求错误"
  switch (status) {
    case 401:
      message = "登录过期，请重新登录！"
      useUserStoreHook().logout()
      location.replace("/login")
      break
    case 403:
      message = "拒绝访问"
      break
    case 404:
      message = "请求地址出错"
      break
    case 408:
      message = "请求超时"
      break
    case 500:
      message = "服务器内部错误"
      break
    case 501:
      message = "服务未实现"
      break
    case 502:
      message = "网关错误"
      break
    case 503:
      message = "服务不可用"
      break
    case 504:
      message = "网关超时"
      break
    case 505:
      message = "HTTP 版本不受支持"
      break
    default:
      break
  }

  ElMessage.error(msg ?? message)

  return message
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // 携带 Token
        Authorization: "Bearer " + getToken(),
        "Content-Type": get(config, "headers.Content-Type", "application/json")
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)
