/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 16:11:59
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 16:33:48
 * @FilePath: /camera/src/renderer/src/composable/useConfig.ts
 * @Description: 组合式持久化储存 api
 */

import { ref } from 'vue'

type ConfigType = {
  deviceId: string
  page: string
}
const initConfig = ref<ConfigType>({
  deviceId: '',
  page: 'camera'
})
export default () => {
  const cache = localStorage.getItem('config')
  const data = cache ? (JSON.parse(cache) as ConfigType) : initConfig
  const config = ref(data)
  /**
   * @description: 更新配置
   * @return {*}
   */
  const updateConfig = () => {
    localStorage.setItem('config', JSON.stringify(config.value))
  }
  return { config, updateConfig }
}
