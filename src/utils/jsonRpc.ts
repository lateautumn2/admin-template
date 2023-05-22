import { ElMessage } from "element-plus"
import { JSONRPCClient } from "json-rpc-2.0"
import { getToken } from "./cache/cookies"

// JSONRPCClient needs to know how to send a JSON-RPC request.
// Tell it by passing a function to its constructor. The function must take a JSON-RPC request and send it.
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("/api/rpc", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(jsonRPCRequest)
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response.json().then((jsonRPCResponse) => client.receive(jsonRPCResponse))
    } else if (jsonRPCRequest.id !== undefined) {
      ElMessage.error(switchErr(response.status, null))
      return Promise.reject(new Error(switchErr(response.status, null)))
    }
  })
)
const switchErr = (status: number, msg: string) => {
  let message = "请求错误"
  switch (status) {
    case 1000:
      message = "登录失效"
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

export const rpcCall = async (method, args) => {
  try {
    return await client.request(method, { ...args })
  } catch (e) {
    switchErr(e.code, e.message)
  }
}
