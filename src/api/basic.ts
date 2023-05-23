import { rpcCall } from "@/utils/jsonRpc"

export const getBasicList = (data) => {
  return rpcCall("main.basicList", data)
}
