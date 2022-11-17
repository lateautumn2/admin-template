<script lang="ts" setup>
/**
 * 日历组件
 * @description
 * @property {Boolean}        isOtherDate                    false              是否展示非本月份的日期
 * @property {Boolean}        hideTitle                      true               是否展示title
 * @property {Boolean}        multiSelect                    false              是否开启摁下鼠标进行多选
 * @property {String}         SelectedBackgroundColor        "#4152b3"          选中的背景色
 * @property {String}         SelectedTextColor              "#ffffff"          选中的文字色
 * @property {Boolean}        isMonday                       true               是否从周一在开头
 * @property {Number}         selectType                     1                  单选1，多选2，范围选3
 * @property {Array}          selectList                     []                 选中数据的数组
 * @property {Boolean}        isSwitch                       true               需要切换按钮传入true
 *
 */
import { ref, computed } from "vue"
import { getRangeDay } from "./utils/getRangeDay.js"
const props = defineProps({
  isOtherDate: {
    type: Boolean,
    default: false
  },
  hideTitle: {
    type: Boolean,
    default: true
  },
  multiSelect: {
    type: Boolean,
    default: false
  },
  SelectedBackgroundColor: {
    type: String,
    default: "#4152b3"
  },
  SelectedTextColor: {
    type: String,
    default: "#ffffff"
  },
  isMonday: {
    type: Boolean,
    default: true
  },
  selectType: {
    type: Number,
    default: 1
  },
  selectList: {
    type: Array as unknown as any,
    default: () => []
  },
  isSwitch: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(["selectedData"])
const isMouseDown = ref(false)
const isNowYear = ref(true)
const isNowMOnth = ref(true)
const hide = ref(1)
const weekSort = ref({
  Sunday: ["日", "一", "二", "三", "四", "五", "六"],
  Monday: ["一", "二", "三", "四", "五", "六", "日"]
})
const clickMonth = ref([
  { key: "一月", value: 1 },
  { key: "二月", value: 2 },
  { key: "三月", value: 3 },
  { key: "四月", value: 4 },
  { key: "五月", value: 5 },
  { key: "六月", value: 6 },
  { key: "七月", value: 7 },
  { key: "八月", value: 8 },
  { key: "九月", value: 9 },
  { key: "十月", value: 10 },
  { key: "十一月", value: 11 },
  { key: "十二月", value: 12 }
])
const lastMonth = ref(["一月", "二月", "三月", "四月"])
const lastYear = ref<Array<any>>([])
const thisYear = ref<Array<any>>([])
//当前日
const currentDay = ref(new Date().getDate())
//当前月
const currentMonth = ref(new Date().getMonth() + 1)
//当前年
const currentYear = ref(new Date().getFullYear())

const initParameter = () => {
  let currentYears = currentYear.value - 1
  for (let p = 3; p >= 0; p--) {
    lastYear.value[p] = currentYears--
  }
  currentYears = currentYear.value
  for (let l = 0; l < 12; l++) {
    thisYear.value[l] = currentYears++
  }
}
initParameter()
const cssProps = computed(() => {
  return {
    "--Q-calendar-background-color": props.SelectedBackgroundColor,
    "--Q-calendar-color": props.SelectedTextColor
  }
})

const arr = ref(props.selectList)
//当前月的天数
const currentMonthDays = computed(() => {
  let dayLength = new Date(currentYear.value, currentMonth.value, 0).getDate()
  let arrs = [] as unknown as any
  for (let h = 0; h < dayLength; h++) {
    let dataObj = {
      year: currentYear.value + "",
      month: currentMonth.value > 0 && currentMonth.value < 10 ? "0" + currentMonth.value : currentMonth.value + "",
      day: h + 1 > 0 && h + 1 < 10 ? "0" + (h + 1) : h + 1 + "",
      checked: false
    }
    arrs[h] = dataObj
  }
  for (let p = 0; p < arr.value.length; p++) {
    for (let k = 0; k < arrs.length; k++) {
      if (
        arr.value[p].year === arrs[k].year + "" &&
        arr.value[p].month === arrs[k].month + "" &&
        arr.value[p].day === arrs[k].day + "" &&
        arr.value[p].checked
      ) {
        arrs[k].checked = true
      }
    }
  }
  return arrs
})

console.log(111, currentMonthDays.value)

//获取上个月剩余多少天
const lastMonthDays = computed(() => {
  const lastLength = new Date(currentYear.value, currentMonth.value - 1, 0).getDate()
  let cutLength
  if (props.isMonday) {
    cutLength = new Date(currentYear.value, currentMonth.value - 1, 0).getDay()
  } else {
    cutLength = new Date(currentYear.value, currentMonth.value - 1, 1).getDay()
  }
  let arr = [] as unknown as any
  for (let h = lastLength - cutLength + 1; h <= lastLength; h++) {
    arr.push(h)
  }
  return arr
})

const onMousewheel = (e) => {
  let evt = e || window.event //考虑兼容性
  evt.preventDefault()
  if (evt.deltaY > 0) {
    onClickDown()
  } else {
    onClickUp()
  }
  //检查事件
  // console.log(evt.type, evt.deltaX, evt.deltaY, evt.deltaZ);
}
const dragDay = (dayObj) => {
  if (!props.multiSelect) {
    return
  } else {
    if (!isMouseDown.value) {
      return
    } else {
      onChangeDay(dayObj)
    }
  }
}
const onMouseDown = (dayObj) => {
  if (!props.multiSelect) {
    return
  } else {
    if (isMouseDown.value) onChangeDay(dayObj)
    isMouseDown.value = true
  }
}
const onMouseUp = () => {
  isMouseDown.value = false
}
const onMouseleave = () => {
  if (isMouseDown.value) {
    isMouseDown.value = false
  }
}
const onChangeDay = (val) => {
  // 判断单选，多选，还是范围选，对应值1.2.3.
  if (props.selectType === 1) {
    if (arr.value.length === 0) {
      val.checked = true
      arr.value = [val]
    } else if (arr.value.length === 1) {
      if (arr.value[0].year === val.year && arr.value[0].month === val.month && arr.value[0].day === val.day) {
        arr.value = []
      } else {
        arr.value = []
        val.checked = true
        arr.value.push(val)
      }
    } else {
      return
    }
  } else if (props.selectType === 2) {
    if (val.checked) {
      // 剔除
      val.checked = false
      arr.value = arr.value.filter((ele) => {
        return !(ele.year === val.year && ele.month === val.month && ele.day === val.day)
      })
    } else {
      // 添加
      val.checked = true
      arr.value.push(val)
    }
  } else if (props.selectType === 3) {
    // 范围选择，
    if (arr.value.length === 0) {
      val.checked = true
      arr.value.push(val)
    } else if (arr.value.length === 1) {
      val.checked = true
      arr.value.push(val)
      const arrS = getRangeDay(arr.value[0], arr.value[1])
      arr.value = []
      arr.value = arrS
    } else {
      arr.value = []
      val.checked = true
      arr.value.push(val)
    }
  }
  emit("selectedData", arr.value)
}
const onChangeYear = (val) => {
  hide.value = 2
  let currentYears = new Date().getFullYear()
  currentYear.value = val.srcElement.innerText
  isNowYear.value = val.srcElement.innerText + "" === currentYears + ""
}
const onChangeMonth = (val) => {
  hide.value = 1
  let currentMonths = new Date().getMonth() + 1
  currentMonth.value = val.value
  isNowMOnth.value = val.value + "" === currentMonths + ""
}
const onClickYears = () => {
  let currentYears = currentYear.value - 1
  for (let p = 3; p >= 0; p--) {
    lastYear.value[p] = currentYears--
  }
  hide.value = 3
}
const onClickMonth = () => {
  hide.value = 2
}
// 获取上个月的剩余多少天
const nextMonth = () => {
  const ac = 42 - currentMonthDays.value.length - lastMonthDays.value.length
  return ac
}

const onClickUp = () => {
  let currentYears = new Date().getFullYear()
  if (hide.value === 1) {
    if (currentMonth.value === 1) {
      currentYear.value--, (currentMonth.value = 13)
    }
    currentMonth.value--
  } else if (hide.value === 2) {
    currentYear.value--
    isNowYear.value = currentYear.value + "" === currentYears + ""
  } else {
    switchingYear(1)
  }
}

const onClickDown = () => {
  let currentYears = new Date().getFullYear()
  if (hide.value === 1) {
    // 日
    if (currentMonth.value === 12) {
      currentYear.value++, (currentMonth.value = 0)
    }
    currentMonth.value++
  } else if (hide.value === 2) {
    // 月默认切换年
    currentYear.value++
    isNowYear.value = currentYear.value + "" === currentYears + ""
  } else {
    // 切换年的选择
    switchingYear(2)
  }
}
const switchingYear = (type) => {
  // 1上，2下
  if (type === 1) {
    // last最后一个为this的最后一个
    let thisAnchor = lastYear.value[3] - 11
    let lastAnchor = lastYear.value[3] - 15
    thisYear.value = []
    for (let p = 0; p < 12; p++) {
      thisYear.value[p] = thisAnchor++
    }
    lastYear.value = []
    for (let l = 0; l < 4; l++) {
      lastYear.value[l] = lastAnchor++
    }
  } else if (type === 2) {
    let anchor = thisYear.value[11] + 1
    lastYear.value = []
    for (let p = 3; p >= 0; p--) {
      lastYear.value[p] = thisYear.value[11]--
    }
    thisYear.value = []
    for (let l = 0; l < 12; l++) {
      thisYear.value[l] = anchor++
    }
  }
}
</script>

<template>
  <!-- 外部 -->
  <div class="Q-calendar" @mouseup.stop="onMouseUp" @mouseleave.stop="onMouseleave">
    <!-- 头部 -->
    <div class="Q-calendar-title" v-if="hideTitle">
      <div class="Q-calendar-title-box Q-calendar-title-box-padding">
        <div @click="onClickYears" class="Q-calendar-title-box-text">{{ this.currentYear }}年</div>
        <div @click="onClickMonth" class="Q-calendar-title-box-text">{{ this.currentMonth }}月</div>
        <!-- <div>{{this.currentDay}}号</div> -->
      </div>
      <slot name="mkCalendarHeaderSlot"></slot>
      <div class="Q-calendar-title-box" v-if="isSwitch">
        <div class="Q-calendar-title-box-text" @click="onClickUp">上</div>
        <div class="Q-calendar-title-box-text" @click="onClickDown">下</div>
      </div>
    </div>
    <div v-else class="Q-calendar-title">
      <div class="Q-calendar-title-box Q-calendar-title-box-center">
        <div class="Q-calendar-title-box-text">{{ this.currentYear }}年</div>
        <div class="Q-calendar-title-box-text">{{ this.currentMonth }}月</div>
      </div>
    </div>
    <!-- 日历 -->
    <transition name="Q-calendar-change">
      <div class="Q-calendar-day" v-if="hide === 1" @mousewheel="onMousewheel">
        <!-- 周一到周日 -->
        <div class="Q-calendar-week">
          <p v-for="item in isMonday ? weekSort.Monday : weekSort.Sunday" :key="item">{{ item }}</p>
        </div>
        <div class="Q-calendar-box">
          <!-- 上个月剩余天数 -->
          <div class="Q-calendar-surplus" v-for="item in lastMonthDays" :key="'dayLast' + item">
            <span v-show="isOtherDate"> {{ item }}</span>
          </div>
          <!-- 当前月份天数 -->
          <div
            v-for="item in currentMonthDays"
            :key="'dayCur' + item.day"
            class="Q-calendar-current-month"
            :style="cssProps"
            @click="onChangeDay(item)"
            :class="{
              'Q-calendar-checked': item.checked,
              nowCss:
                new Date().getFullYear() + '' === item.year &&
                new Date().getMonth() + 1 + '' === item.month &&
                new Date().getDate() + '' === item.day
            }"
            @mouseover="dragDay(item)"
            @mousedown="onMouseDown(item)"
          >
            <span> {{ item.day }}</span>
          </div>
          <!-- 下月余出 -->
          <div class="Q-calendar-surplus" v-for="item in nextMonth" :key="'dayNext' + item">
            <span v-show="isOtherDate">{{ item }}</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 月 -->
    <transition name="Q-calendar-change">
      <div class="Q-calendar-years" v-if="hide === 2" @mousewheel="onMousewheel">
        <div class="Q-calendar-years-box">
          <div
            v-for="item in clickMonth"
            :key="'monthCur' + item.value"
            @click="onChangeMonth(item)"
            :class="{
              nowCss: isNowYear && new Date().getMonth() + 1 === item.value
            }"
          >
            <span>{{ item.key }}</span>
          </div>
          <div class="Q-calendar-surplus" v-for="item in lastMonth" :key="'monthNext' + item">
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 年 -->
    <transition name="Q-calendar-change">
      <div class="Q-calendar-years Q-calendar-year" v-if="hide === 3" @mousewheel="onMousewheel">
        <div class="Q-calendar-years-box">
          <div class="Q-calendar-surplus" v-for="item in lastYear" :key="'yearLast' + item">
            <span>{{ item }}</span>
          </div>
          <div
            v-for="item in thisYear"
            :key="'yearCur' + item"
            @click="onChangeYear"
            :class="{ nowCss: new Date().getFullYear() === item }"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
