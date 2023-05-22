import { rpcCall } from "@/utils/jsonRpc"

export const loginApi = (data) => {
  return rpcCall("main.login", data)
}
