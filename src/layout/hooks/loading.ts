import { createVNode, render } from "vue"
import type { App } from "vue"
import loading from "@/components/Loading/index.vue"

const container = document.createElement("div")
//创建虚拟节点
const vm = createVNode(loading)
//渲染虚拟节点
render(vm, container)

export const loadPlguin = {
  show(options = null) {
    const { text, fontColor, graphColor, bgColor } = options ?? {}
    vm.component.props.show = true
    vm.component.props.text = text ?? "加载中"
    vm.component.props.fontColor = text ?? "pink"
    vm.component.props.graphColor = text ?? "pink"
    vm.component.props.bgColor = text ?? "rgba(0, 0, 0, 0.5)"
    document.body.appendChild(container)
  },
  hide() {
    vm.component.props.show = false
    document.body.removeChild(container)
  }
}
export default {
  //组件注册
  install(app: App): void {
    app.config.globalProperties.$message = loadPlguin
  }
}
