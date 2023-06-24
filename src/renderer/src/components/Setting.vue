<!--
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 15:26:32
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 16:55:28
 * @FilePath: /camera/src/renderer/src/components/Setting.vue
 * @Description: 选择摄像头
-->
<template>
  <main class="bg-[#2c3e50] w-screen h-screen p-5 flex flex-col gap-5 py-10 z-10">
    <h2 class="text-gray-50 text-center text-sm opacity-70">参数设置</h2>
    <el-select v-model="config.deviceId" placeholder="选择摄像头">
      <el-option
        v-for="item in cameras"
        :key="item.deviceId"
        :label="item.label"
        :value="item.deviceId"
      />
    </el-select>
    <el-input v-model="config.borderWidth" :min="0" placeholder="边框宽度" type="number" />
    <el-input v-model="config.borderColor" placeholder="边框颜色" />
    <h2 class="text-center opacity-70 text-xs text-teal-100">此软件由"杨杨"开发</h2>
  </main>
</template>

<script lang="ts" setup>
import { useConfig } from '@renderer/stores/useConfig'
// 请求一个可用的媒体输入和输出设备的列表
const devices = await navigator.mediaDevices.enumerateDevices()
const cameras = devices.filter((device) => device.kind.includes('video'))
const { config } = useConfig()
</script>
