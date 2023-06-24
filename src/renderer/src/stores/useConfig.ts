/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 16:43:13
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 16:50:46
 * @FilePath: /camera/src/renderer/src/stores/useConfig.ts
 * @Description: pinia config
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfig = defineStore(
  'config',
  () => {
    const config = ref({
      // 当前摄像头 id
      deviceId: '',
      // 当前页面
      page: 'camera',
      // 边框宽度
      borderWidth: 0,
      // 边框颜色
      borderColor: '#f39c12',
      // 是否圆角
      rounded: false
    })

    const updateConfig = () => {}

    return { config, updateConfig }
  },
  {
    persist: true
  }
)
